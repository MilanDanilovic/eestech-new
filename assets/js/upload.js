function upload() {
    var file = document.querySelector(".upload-form").value;
    // var getPath = file.split("fakepath\\")
    // var path = getPath[1]

    fetch("https://api.metadefender.com/v4/file", {
        body: `${file}`,
        //body: "@/assets/eicar.com",
        headers: {
            Apikey: "89e9dbae3ba768e519b2326aa3693092",
            "Content-Type": "application/octet-stream"
        },
        method: "POST"
    })
        .then(blob => blob.json())
        .then(data => {
            console.table(data);
            fetch(`https://api.metadefender.com/v4/file/${data.data_id}`, {
                headers: {
                    Apikey: "89e9dbae3ba768e519b2326aa3693092"
                }
            })
                .then(blob2 => blob2.json())
                .then(data2 => {
                    if (data2.scan_results.progress_percentage < 100) {
                        console.log("not done")
                        setTimeout(4000);
                        getapi(data2);

                    }
                })




        })
}

function getapi(data) {
    var result = document.getElementById("searchResults");
    var loader = document.getElementById("loader-search")
    var el = document.getElementById("section-search-data")
    fetch(`https://api.metadefender.com/v4/file/${data.data_id}`, {
        headers: {
            Apikey: "89e9dbae3ba768e519b2326aa3693092"
        }
    })
        .then(blob2 => blob2.json())
        .then(data2 => {
            console.log(data2);
            if (data2.scan_results.progress_percentage < 100) {
                getapi(data2)
                result.innerHTML = "This may take a few seconds...";
                result.style.backgroundColor = "transparent"
                loader.style.display = "block";
            }
            else {
                console.log("done");
                var threat
                let risk = 0.0
                var Totalrisk = 1.0
                el.style.display = "block"
                let html = '';
                var dictionary = data2.scan_results.scan_details
                Object.keys(dictionary).forEach(function (key) {



                    if (dictionary[key].threat_found == "") {
                        threat = "No threats found."
                    }
                    else {
                        threat = dictionary[key].threat_found
                        risk = 0.1
                    }
                    let htmlSegment = `<tr>
                        <td>${key}</td>
                        <td>${dictionary[key].scan_time} ms</td>
                        <td>${threat}</td>
                        <td>${risk}</td>
                    </tr>`;


                    html += htmlSegment;
                })
                let container = document.querySelector('#file-scanned');
                container.innerHTML = html;

                loader.style.display = "none"
                result.display = "block"
                result.innerHTML = `${data2.scan_results.scan_all_result_a}<br>Risk Factor: ${Totalrisk}/10.0`
                

                if (data2.scan_results.total_detected_avs == 0) {
                    result.style.backgroundColor = 'rgb(' + 112 + ',' + 173 + ',' + 112 + ')';
                }
                else {
                    result.style.backgroundColor = 'rgba(' + 170 + ',' + 60 + ',' + 60 + ',' + 0.616 + ')';
                }

            }
        })
}