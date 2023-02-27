const express = require('express');
const app = express();
const axios = require('axios');
const port = 8009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let domain = "http://Your-KibanaDomain.comwith:port" // replace the url with your kibana domain 

app.all('/:endpoint(*)', async (req, res) => {
  try {
    const { endpoint } = req.params;
    const { body, method } = req;
    console.log(endpoint)
    const headers = {
      'Content-Type': 'application/json',
      'Origin': domain,
      'Referer': `${domain}/app/kibana`,
      'Sec-GPC': '1',
      'kbn-version': '7.5.0' // Kibana version
    };

    let url = `${domain}/api/console/proxy?path=${endpoint}&method=GET` // actual url
    console.log(url);
    const response = await axios({
      method,
      url: url,
      data: body,
      headers
    });

    res.send(response.data);
  } catch (error) {
    res.status(500).send("ERROR");
  }
});

app.listen(port, () => console.log(`Elastic Proxy listening on port ${port}!`));
