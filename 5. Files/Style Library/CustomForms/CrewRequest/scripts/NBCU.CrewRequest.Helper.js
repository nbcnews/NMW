NBCU.CrewRequest.Helper = function () {
    this.saveID = 0;
    this.bnSaveID = 0;
    this.clsSaveID = 0;
    this.bcSaveID = 0;
    this.whoPageData = [];
    this.whatPageTalentData = [];
    this.whatPageShowUnitData = [];
    this.whenPageShootData = [];
    this.whentransmissionTypeData = [];
    this.dataTalentSaved = false;
    this.dataShowUnitSaved = false;
    this.dataShootSaved = false;
    this.txtUnit = 0;
    this.cntTalent = 0;
    this.requestorKey = "";
    this.producerKey = "";
    this.SeniorProducerKey = "";
    this.shootDesc = [];

    var serverurl = location.protocol + "//" + location.host;
    var serverPath = serverurl + "/sites/bcast_prodreq/_api/Web/Lists";
    var date = new Date();
    var crewRequestIdPrefix = "CR" + date.getFullYear();

    this.addZero = {
        1: "0000",
        2: "000",
        3: "00",
        4: "0"
    };

    this.CrewType = {
        General: 'General Crew Request',
        Breaking: 'Breaking News',
        Bureau: 'Bureau Camera',
        Correspondent: 'Correspondent Live Shot'
    }

    /** Get the data from list with the respective query **/
    this.ReadList = function (url, listName, query) {
        var results = [];
        try {
            $.ajax({
                url: serverPath + "/GetByTitle('" + listName + "')/items" + query,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                async: false,
                success: function (data) {
                    results = data.d.results;
                },
                error: function (data) {
                    console.log(data);
                }
            });
            return results;
        } catch (e) {
            console.log(e.message);
        }
    };

    this.parseDate = function (str) {
        var mdy = str.split('-')
        return new Date(mdy[0], mdy[1] - 1, mdy[2]);
    }

    this.daydiff = function (first, second) {
        return (second - first) / (1000 * 60 * 60 * 24)
    }

    /** Add item to list **/
    this.addItem = function (data, listName) {
        var returnData = [];
        try {
            $.ajax({
                url: serverPath + "/GetByTitle('" + listName + "')/items",
                type: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify(data),
                async: false,
                success: function (data) {
                    returnData = data;
                    console.log("Add success");
                },
                error: function (error) {
                    console.log("error success");
                }
            });
            return returnData;
        } catch (e) {
            console.log(e.message);
        }
    };

    /** Update the list item by using id **/
    this.updateItem = function (data, listName, id) {
        try {
            $.ajax({
                url: serverPath + "/GetByTitle('" + listName + "')/items(" + id + ")",
                type: "POST",
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(data),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "MERGE",
                    "If-Match": "*"
                },
                async: false,
                success: function (data) {
                    console.log("Update Sucess");
                },
                error: function (error) {
                    console.log("Update Error");
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    /** Delete the list item by using id **/
    this.deleteItem = function deleteItem(data, listName, id) {
        try {
            $.ajax({
                url: serverPath + "/GetByTitle('" + listName + "')/items(" + id + ")",
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-Http-Method": "DELETE",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "If-Match": "*"
                },
                success: function (data) {
                    console.log("Delete Sucess");
                },
                error: function (error) {
                    console.log("Delete Error");
                }
            });
        } catch (e) {
            console.log(e.message)
        }
    };

    this.isValidPhoneNo = function (phone) {
        var pattern = /^[0-9()_ +-]*$/i;
        return pattern.test(phone);
    }

    this.dateParse = function (date) {
        var dateFormat = new Date(date);
        var dDate = ((dateFormat.getDate().toString().length) == 2) ? (dateFormat.getDate()) : '0' + (dateFormat.getDate());
        var dMonth = (((dateFormat.getMonth() + 1).toString().length) == 2) ? (dateFormat.getMonth() + 1) : '0' + (dateFormat.getMonth() + 1);

        return dateFormat.getFullYear() + "-" + dMonth + "-" + dDate;
    };

    this.getCrewRequestID = function (crewId) {
        var crewReuestID = crewRequestIdPrefix;
        var crewIdLength = crewId.toString().length;
        if (crewIdLength <= 4) {
            crewReuestID = crewReuestID + addZero[crewIdLength] + crewId;
        }
        else {
            crewReuestID = crewReuestID + crewId;
        }
        return crewReuestID;
    };

    /** convert time to 12hrs with AM/PM **/
    this.tConvert = function (time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ':AM' : ':PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    this.validHour = function (hr) {
        var pattern = /^(\d|1[0-2]|0[0-9])$/
        return pattern.test(hr);
    }

    this.validMin = function (hr) {
        var pattern = /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/
        return pattern.test(hr);
    }

    this.checkRemove = function (list, crewID, Field) {
        var getData = this.ReadList("/sites/NMWF", list, "?$select=ID&$filter=" + Field + "" + "  eq '" + crewID + "'");
        if (getData.length > 0) {
            var metaDataList = list;
            metaDataList = metaDataList.replace('_', '_x005f_');
            metaDataList = { 'type': "SP.Data." + metaDataList + "ListItem" };
            $.each(getData, function (index, val) {
                var data = {
                    __metadata: metaDataList,
                    ID: val.ID
                };
                NBCU.CrewRequest.Helper.deleteItem(data, list, val.ID);
            })
        }
    }

    this.sendEmail = function (listId) {
        if (listId != "") {
            var weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var crewItem = NBCU.CrewRequest.Helper.ReadList("", "CrewRequest", "?select=ID,Title,CCEmailKey,requestorKey,EstimatedCost,producerKey,SeniorProducerKey,AssignmentSlug,Country,CrewCity,CrewState,CrewType,ShootStatus,CrewRequestID,StartDate1,EndDate1,MeetTime,RollTime,DayZone,CrewAddress,Camera,Audio,Utilities,ProductionType,SpecialGear,AudioNeed,SpecialConditions,TransmissionType,Requester,CellPhone,Producer,ProducerCellNumber,Approver&$filter= ID eq '" + listId + "'");
            $.each(crewItem, function (ind, val) {
                var showData = NBCU.CrewRequest.Helper.ReadList("", "CRT_ShowUnit", "?select=ID,Title,RequestID,AssignedBudgetCode&$filter= RequestID eq '" + listId + "'");
                var talentData = NBCU.CrewRequest.Helper.ReadList("", "CRT_Talent", "?select=ID,Title,CrewRequestID&$filter= CrewRequestID eq '" + listId + "'");
                var returnVal = NBCU.CrewRequest.Helper.ReadList("", "EmailTemplates", "?select=ID,Content,scenario,WithInADay,cc,bcc&$filter= scenario eq 'FYI'");

                var startdate1 = '';
                var startdate = '';
                if (nullckeck(val.StartDate1) != "") {
                    startdate1 = nullckeck(val.StartDate1).split('-');
                    startdate = startdate1[1] + "/" + startdate1[2].split('T')[0];
                }
                var endDate1 = '';
                var enddate = '';
                if (nullckeck(val.EndDate1) != "") {
                    endDate1 = nullckeck(val.EndDate1).split('-');
                    enddate = endDate1[1] + "/" + endDate1[2].split('T')[0];
                }
                var header = "";
                if (showData.length > 0) {
                    header += showData[0].Title + " : ";
                }
                header += val.AssignmentSlug;
                if (talentData.length > 0) {
                    header += " (";
                    $.each(talentData, function (talInd, talVal) {
                        if (talInd == 0) {
                            header += talVal.Title;
                        }
                        else {
                            header += ' | ' + talVal.Title;
                        }
                    });
                    header += ") | ";
                }
                if (nullckeck(val.ShootStatus) != "") {
                    header += nullckeck(val.ShootStatus) + " | ";
                }
                if (val.CrewType === 'Bureau Camera') {
                    header += " | ";
                }
                header += nullckeck(val.CrewRequestID);
                var body = returnVal[0].Content;
                //Header Section..
                body = body.replace('##Header##', header);
                var today = new Date();
                //Remove this to get current time, leave this to get time start of day
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                var currentDateTimestamp = today.getTime();
                var selectedDateTimestamp = new Date(nullckeck(val.StartDate1)).getTime();
                //Check if the timestamp is within 24 hours, 24 hours = 60 seconds * 60 minutes * 24 hours * 1000 milliseconds
                if (Math.abs(currentDateTimestamp - selectedDateTimestamp) <= 60 * 60 * 24 * 1000) {
                    //Within 24 hours
                    body = body.replace('##dates##', (nullckeck(val.StartDate1) !== "" ? weekDay[(new Date(nullckeck(val.StartDate1))).getDay()] : nullckeck(val.StartDate1))  + " " + startdate + " - " + (nullckeck(val.EndDate1) !== "" ? weekDay[(new Date(nullckeck(val.EndDate1))).getDay()] : nullckeck(val.EndDate1)) + " " + enddate + " *shoot starts within 24hrs*");
                }
                else {
                    body = body.replace('##dates##', (nullckeck(val.StartDate1) !== "" ? weekDay[(new Date(nullckeck(val.StartDate1))).getDay()] : nullckeck(val.StartDate1)) + " " + startdate + " - " + (nullckeck(val.EndDate1) !== "" ? weekDay[(new Date(nullckeck(val.EndDate1))).getDay()] : nullckeck(val.EndDate1)) + " " + enddate);
                }
                //##dates##
                //MeetTime,RollTime,DayZone
                body = body.replace('##meetTime##', nullckeck(val.MeetTime) + " " + nullckeck(val.DayZone));
                body = body.replace('##rollTime##', nullckeck(val.RollTime) + " " + nullckeck(val.DayZone));
                //##address##
                body = body.replace('##address##', nullckeck(val.CrewAddress));

                //##ShootDescription​##
                //var ShootDescription = '';
                //$.each(shootDescData, function (SDind, SDval) {
                //    if (SDind == 0) {
                //        ShootDescription += "<div style='display:block;'>" + nullckeck(SDval.ShootDescription) + "</div>";
                //    }
                //    else {
                //        ShootDescription += "<div style='display:block;'>" + SDval.Title + " | " + nullckeck(SDval.MeetTime) + " | " + nullckeck(SDval.ShootDescription) + "</div>";
                //    }
                //});
                body = body.replace('##ShootDescription##', nullckeck(val.ShootDescription));
                //##budgetCode##
                body = body.replace('##camera##', nullckeck(val.Camera));
                body = body.replace('##​audio##', nullckeck(val.Audio));
                body = body.replace('##utilities##', nullckeck(val.Utilities));
                body = body.replace('##productionType##', nullckeck(val.ProductionType));

                body = body.replace('##specialGear##', nullckeck(val.SpecialGear));
                body = body.replace('##audioNeed##', nullckeck(val.AudioNeed));
                body = body.replace('##specialConditions##', nullckeck(val.SpecialConditions));
                body = body.replace('##transmissionType##', nullckeck(val.TransmissionType));
                body = body.replace('##estimatedCost##', nullckeck(val.EstimatedCost));
                //EstimatedCost
                var showUnit = '';
                $.each(showData, function (showInd, showVal) {
                    if (showInd == 0) {
                        showUnit += showVal.AssignedBudgetCode;
                    }
                    else {
                        showUnit += ", " + showVal.AssignedBudgetCode;
                    }
                });
                body = body.replace('##budgetCode##', showUnit);
                body = body.replace('##requestor##', val.Requester + "  " + val.CellPhone1);
                body = body.replace('##producer##', nullckeck(val.Producer) + "  " + nullckeck(val.ProducerCellNumber));
                body = body.replace('##seniorProducer##', nullckeck(val.Approver));

                var subject = '[CREW REQ] ' + startdate + '--"';
                if (showData.length > 0) {
                    subject += nullckeck(showData[0].Title) + ':';
                }
                subject += nullckeck(val.AssignmentSlug) + '"--';
                if (nullckeck(val.Country) != "United States of America") {
                    subject += nullckeck(val.Country) + ', ';
                }
                subject += nullckeck(val.CrewCity) + ' city, ' + nullckeck(val.CrewState) + ' | ' + nullckeck(val.ShootStatus);

                //if (val.Country == "United States of America") {
                //    //subject = '[CREW REQ] ' + startdate + '--"' + nullckeck(showData[0].Title) + ':' + nullckeck(val.AssignmentSlug) + '"--' + nullckeck(val.CrewCity) + ' city, ' + nullckeck(val.CrewState) + ' | ' + nullckeck(val.ShootStatus);
                //}
                //else {
                //    //subject = '[CREW REQ] ' + startdate + '--"' + nullckeck(showData[0].Title) + ':' + nullckeck(val.AssignmentSlug) + '"--' + nullckeck(val.Country) + ', ' + nullckeck(val.CrewCity) + ' city, ' + nullckeck(val.CrewState) + ' | ' + nullckeck(val.ShootStatus);
                //}

                var from = 'MTASharePointDEV@nbcuni.com';
                var to = [];
                if (!!val.CCEmailKey) {
                    var ccEmail = val.CCEmailKey.split(';');
                    $.each(ccEmail, function (ccInd, ccVal) {
                        if (!!ccVal) {
                            to.push(ccVal);
                        }
                    })
                }
                if (!!val.requestorKey) {
                    to.push(val.requestorKey);
                }
                if (!!val.producerKey) {
                    var toProducer = val.producerKey.split(';');
                    $.each(toProducer, function (toInd, toVal) {
                        if (!!toVal) {
                            to.push(toVal);
                        }
                    })
                }
                if (!!val.SeniorProducerKey) {
                    var toSeniorProducer = val.SeniorProducerKey.split(';');
                    $.each(toSeniorProducer, function (toInd, toVal) {
                        if (!!toVal) {
                            to.push(toVal);
                        }
                    })
                }
                //to.push('crewdesk@nbcuni.com')
                var cc = [];
                if (!!returnVal[0].cc) {
                    cc.push(returnVal[0].cc)
                }
                if (!!returnVal[0].WithInADay) {
                    cc.push(returnVal[0].WithInADay)
                }
                var bcc = [];
                if (!!returnVal[0].bcc) {
                    bcc.push(returnVal[0].bcc)
                }
                triggerMail(from, to, cc, bcc, body, subject);
            });
        }
    }

    function triggerMail(from, to, cc, bcc, body, subject) {
        //Get the relative url of the site
        var siteurl = _spPageContextInfo.webServerRelativeUrl;
        var urlTemplate = "/_api/SP.Utilities.Utility.SendEmail";
        $.ajax({
            contentType: 'application/json',
            url: urlTemplate,
            type: "POST",
            data: JSON.stringify({
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                    'From': from,
                    'To': {
                        'results': to
                    },
                    'CC': {
                        'results': cc
                    },
                    'BCC': {
                        'results': bcc
                    },
                    'Body': body,
                    'Subject': subject
                }
            }),
            headers: {
                "Accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                console.log('Email Sent Successfully');
            },
            error: function (err) {
                console.log('Error in sending Email: ' + JSON.stringify(err));
            }
        });
    }


    function nullckeck(value) {
        var returnVal = "";
        if (!!value) {
            returnVal = value;
        }
        return returnVal;
    }

    return {
        CrewType: this.CrewType,
        ReadList: this.ReadList,
        parseDate: this.parseDate,
        daydiff: this.daydiff,
        addItem: this.addItem,
        updateItem: this.updateItem,
        deleteItem: this.deleteItem,
        saveID: this.saveID,
        isValidPhoneNo: this.isValidPhoneNo,
        dateParse: this.dateParse,
        whoPageData: this.whoPageData,
        whatPageTalentData: this.whatPageTalentData,
        whatPageShowUnitData: this.whatPageShowUnitData,
        whenPageShootData: this.whenPageShootData,
        dataTalentSaved: this.dataTalentSaved,
        dataShowUnitSaved: this.dataShowUnitSaved,
        txtUnit: this.txtUnit,
        cntTalent: this.cntTalent,
        bnSaveID: this.bnSaveID,
        clsSaveID: this.clsSaveID,
        bcSaveID: this.bcSaveID,
        getCrewRequestID: this.getCrewRequestID,
        addZero: this.addZero,
        tConvert: this.tConvert,
        validHour: this.validHour,
        validMin: this.validMin,
        checkRemove: this.checkRemove,
        whentransmissionTypeData: this.whentransmissionTypeData,
        requestorKey: this.requestorKey,
        producerKey: this.producerKey,
        SeniorProducerKey: this.SeniorProducerKey,
        shootDesc: this.shootDesc,
        sendEmail: this.sendEmail
    }
}();
