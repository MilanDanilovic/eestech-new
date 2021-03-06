//let key = "aca585867e912f1c58ed1dc0892b7121754c09d5";

// function pretrziIPDB(keyword) {   //domain i ip
//     const key = "b5728fd97cdc6b5ca519bd7aeb066ad48de1475b7df94d5e2d54f2f73484a11742545c259d204cf5";
//     let api = `https://www.abuseipdb.com/check/${keyword}/json?key=${key}&days=30`;
//     fetch(api, { mode: 'no-cors' })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function ({ data }) {
//             console.log(data)
//             aqiValue = data[0].aqi;
//             city = data[0].station.name;
//         })
//         .then(() => {
//             displayAqi();
//         })
// }
function pretrziIPDB(keyword) {

  const key = "b5728fd97cdc6b5ca519bd7aeb066ad48de1475b7df94d5e2d54f2f73484a11742545c259d204cf5";
  let api = `https://www.abuseipdb.com/check/${keyword}/json?key=${key}&days=1`;
  fetch(api, { headers: "*" })
    .then(blob => blob.json())
    .then(data => {
      console.table(data);
      return data;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
}

function url(keyword)
{

 let api = `https://api.spyonweb.com/v1/domain/${keyword}?access_token=d7xYdbRIZVPQ`;
fetch(api)
  .then(blob => blob.json())
  .then(data => {
   console.log(data);


    return data;
  })
  .catch(e => {
    console.log(e);
    return e;
  });}


function citaj() {
  var pom = document.getElementById("ioc-input").value;
  var cekiran = document.getElementById("drop-down-toggle-button").value;

  var div1 = document.getElementById("section-file-scan")
  var div2 = document.getElementById("section-search-data")
  var div3 = document.getElementById("section-search-data-ip")
  var div4 = document.getElementById("section-search-data-hash")

  if (cekiran == 1) {  //za ip4
    this.renderRoutes();
    this.collectVirusTotal(pom);
    div1.style.display = "none"
    div4.style.display = "none"
  }
  if (cekiran == 3) {

    div1.style.display = "none"
    div2.style.display = "none"
    div3.style.display = "none"

    this.pretraziHes(pom);
  }

  this.url(pom);}








function pretraziIPINFO(keyword) {

  let api = `https://ipinfo.io/${keyword}/json?token=06fd3125a2044e`;
  fetch(api)
    .then(blob => blob.json())
    .then(data => {
      console.table(data);


      return data;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
}






// function pretrziIPDB(keyword) {   //domain i ip
//     const key = "b5728fd97cdc6b5ca519bd7aeb066ad48de1475b7df94d5e2d54f2f73484a11742545c259d204cf5";
//     let api = `https://www.abuseipdb.com/check/${keyword}/json?key=${key}&days=30`;
//     fetch(api, { mode: 'no-cors' })
//     .then(p => {
//         p.json().then(data => {
//             data.forEach(el => {
//                 console.log(el);
//             });
//         });
//     });
// }



//https://ipinfo.io/5.57.72.112/json?token=06fd3125a2044e





async function getRoutes() {
  var pom = document.getElementById("ioc-input").value;
  const api_url = "https://ipinfo.io/" + pom + "/json?token=06fd3125a2044e";
  let url = api_url;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


async function renderRoutes() {

  let routes = await getRoutes();
  let html = '';
  //routes.forEach(el => {
  let htmlSegment = ` <tr>
                            <td>${routes.ip}</td>
                            <td colspan="2">${routes.city}</td>
                            <td colspan="2">${routes.region}</td>
                            <td>${routes.country}</td>
                            <td>${routes.loc}</td>
                            <td colspan="2">${routes.org}</td>
                            <td>${routes.timezone}</td>
                          </tr>`;

  html += htmlSegment;
  //});
  let container = document.querySelector('#table-body');
  container.innerHTML = html;

}


function showOnlyOnce() {
  {



    var x = document.getElementById("search-data");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}
///////////////////////////////

function collectVirusTotal(ipadd) {

  

  fetch(`https://www.virustotal.com/api/v3/ip_addresses/${ipadd}`,
    { headers: { "X-Apikey": "e2df44921149e28226700cb5563b8b272fe71521c88f18d1aeaefc2761f2004b" } }).then(p => {
      p.json().then(data => {
        //var obj=JSON.parse(data);
        console.log(data);
        let html = '';
        var totalRisk = 0.0
        var dictionary = data.data.attributes.last_analysis_results;
        Object.keys(dictionary).forEach(function (key) {
          console.log(key, dictionary[key]);
          let htmlSegment = ``;
          if (`${dictionary[key].category}` == "malicious") {
            totalRisk += 0.4
            htmlSegment = ` <tr>
                  <td>${key}</td>
                  <td>${dictionary[key].category}</td>
                   <td>${dictionary[key].engine_name}</td>
                   <td>${dictionary[key].method}</td>
                   <td>${dictionary[key].result}</td>
                   <td style="background-color:red; color:white">0.4</td>
                </tr>`;
          }
          else if (`${dictionary[key].category}` == "suspicious") {
            totalRisk += 0.1
            htmlSegment = ` <tr>
                  <td>${key}</td>
                  <td>${dictionary[key].category}</td>
                   <td>${dictionary[key].engine_name}</td>
                   <td>${dictionary[key].method}</td>
                   <td>${dictionary[key].result}</td>
                   <td style="background-color:red; color:white">0.1</td>
                </tr>`;
          }
          else {
            htmlSegment = ` <tr>
                  <td>${key}</td>
                  <td>${dictionary[key].category}</td>
                   <td>${dictionary[key].engine_name}</td>
                   <td>${dictionary[key].method}</td>
                   <td>${dictionary[key].result}</td>
                   <td>0.0</td>
                </tr>`;

          }

          html += htmlSegment;
        });


        let container = document.querySelector('#table-body-ip');
        container.innerHTML = html;

        var result = document.getElementById("searchResults");
        result.display = "block"
        if(totalRisk>10){
          totalRisk == 10
        }
        result.style.backgroundColor = 'rgba(' + 170 + ',' + 60 + ',' + 60 + ',' + 0.616 + ')';
        result.innerHTML = `Risk Factor: ${totalRisk}/10.0`

      });
    });

}





function pretraziHes(hash) {
  fetch("https://api.metadefender.com/v4/hash/" + hash, {
    headers: {
      Apikey: "4070af732fb605e721bdb9f900eb52b2"
    }
  })
    .then(blob => blob.json())
    .then(data => {
      let html = '';
      //routes.forEach(el => {
      let htmlSegment = ` <tr>
                            <td>${data.file_info.md5}</td>
                            <td>${data.malware_family}</td>
                            <td>${data.malware_type}</td>
                            <td>${data.scan_results.total_avs}</td>
                            <td>${data.scan_results.total_detected_avs}</td>
                            <td>${data.threat_name}</td>
                          </tr>`;

      html += htmlSegment;
      //});
      let container = document.querySelector('#table-body-hash');
      container.innerHTML = html;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
}

