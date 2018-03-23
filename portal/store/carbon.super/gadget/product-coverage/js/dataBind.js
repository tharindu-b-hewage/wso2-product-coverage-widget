/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var coverageInfo = [];
const GREEN = "#32CD32";
const RED = "#db2804";

function getDataFromService() {

    /*$.post("/portal/controllers/apis/product-coverage/productCoverageData.jag", {
        action: "getCoverage"
    },
    function (data) {

        var coverageInfo = [];
        for (var i = 0; i < data.length; i++) {
          coverageInfo.append(JSON.parse(data[i]));
        }
        addHeader();
        addRows();
    });*/

    coverageInfo.push('{"name":"APIM", "value":".2", "Threshold":".7"}');
    coverageInfo.push('{"name":"IS", "value":".4", "Threshold":".7"}');
    coverageInfo.push('{"name":"Siddhi", "value":".75", "Threshold":".7"}');
    addHeader();
    addRows();
}

function addHeader() {
    $("#report").append("" +
        "<tr>" +
        "<th>"+"Product Areas"+"</th>" +
        "<th>"+"Unit Test Coverage"+"</th>" +
        "</tr>");
}

function addRows() {
    for (index = 0; index < coverageInfo.length; index++) {
        var data = JSON.parse(coverageInfo[index]);
        var productTag = "productCoverage" + index;
        var color = GREEN;
        if (data.value<data.Threshold) {
          color = RED;
        }
        $("#report").append("<tr><td>"+data.name+"</td>"
        +"<td id=" + productTag +">"+data.value*100+"%</td>");
        $("#" + productTag).circleProgress({
          value: data.value,
          size: 50,
          startAngle: Math.PI*(1.5),
          thickness: 5,
          fill: {
            color: color
          }
        });
    }
}

getDataFromService();
setTimeout(function(){
    window.location.reload(1);
 }, 60000);
