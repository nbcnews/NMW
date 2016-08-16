NBCU.EditRequest.Helper = function () {
    this.saveID = 0;
    this.lfSaveID = 0;
    this.MSNBCSaveID = 0;
    this.TdySaveID = 0;
    this.room = [];
    this.business = [];
    this.LocationOfEdit = [];
    this.labelSelection = "";
    this.requestorKey = "";
    this.network = [];
    this.addZero = {
        1: "0000",
        2: "000",
        3: "00",
        4: "0"
    };

    var serverurl = location.protocol + "//" + location.host;
    var serverPath = serverurl + "/sites/bcast_prodreq/_api/Web/Lists";
    var date = new Date();
    var crewRequestIdPrefix = "ER" + date.getFullYear();

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

    this.initializePeoplePickerValue = function (peoplePickerElementId, displayValue) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = false;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        var users = new Array(1);
        var defaultUser = new Object();
        defaultUser.DisplayText = displayValue;
        defaultUser.EntityType = "User";
        defaultUser.IsResolved = true;
        defaultUser.Resolved = true;
        users[0] = defaultUser;
        //// Pass the ID of the DOM element that contains the picker, an array of initial
        //// PickerEntity objects to set the picker value, and a schema that defines
        //// picker properties.
        SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    this.clearPeoplePicker = function (peoplePickerElementId) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = false;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        var users = new Array(1);
        //// Pass the ID of the DOM element that contains the picker, an array of initial
        //// PickerEntity objects to set the picker value, and a schema that defines
        //// picker properties.
        SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    this.initializePeoplePicker = function (peoplePickerElementId, AllowMultipleValues) {

        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = AllowMultipleValues;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';

        // Render and initialize the picker.
        // Pass the ID of the DOM element that contains the picker, an array of initial
        // PickerEntity objects to set the picker value, and a schema that defines
        // picker properties.
        SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    }

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


    this.sendEmail = function (editId) {
        if (editId !== "") {
            var editItem = ReadList("", "EditRequest", "?select=ID,Title,EditRequestID,RequestorName,RequestorContact,ProducerName,SeniorProducer,Slug,Business,LocationofEdit,AirDate,Correspondent,PleceMinutes,PleceSeconds,PleceTBD,EditStartDate,RequestedEditSection,CraftEditDays,CraftEditHours,CraftEditMinutes,IsCrashEdit,IsFieldEditing,Isrecut,IsCraftEditBrollTeasesVosSOTS,ERCREditedBy,CraftEditComments,AMMusic,AMGraphicStills,AMColorCorrect,AMAudioCorrect,AMEffects,AMOther,AMAllOfTheAbove,AROtherText&$filter= ID eq '" + editId + "'");
            $.each(editItem, function (ind, val) {
                var returnVal = ReadList("", "EmailTemplates", "?select=ID,Content,scenario,WithInADay,cc,bcc&$filter= scenario eq 'ER New'");
                var showData = ReadList("", "ER_ShowUnit", "?select=ID,Title,RequestID,AssignedBudgetCode&$filter= RequestID eq '" + editId + "'");
                var absURL = val.FieldValuesAsText.__deferred.uri.split('_api/');
                var body = returnVal[0].Content;
                body = body.replace('##EditRequestID##', nullckeck("<a href='" + absURL[0] + "Pages/Home.aspx?CRID=" + val.Id + "'>" + val.EditRequestID + "</a>"));
                body = body.replace('##Requestor##', nullckeck(val.RequestorName));
                body = body.replace('##RequestorPhone##', nullckeck(val.RequestorContact));
                body = body.replace('##SeniorProducer##', nullckeck(val.SeniorProducer));
                body = body.replace('##SeniorProducerphone##', '');
                body = body.replace('##Producer##', nullckeck(val.ProducerName));
                body = body.replace('##ProducerPhone##', '');
                body = body.replace('##Slug##', nullckeck(val.Slug));
                body = body.replace('##Business##', nullckeck(val.Business));

                var showValues = nullckeck(val.ShowUnit);
                var budValues = nullckeck(val.BudgetCode);
                
                body = body.replace('##ShowUnit##', showValues);
                body = body.replace('##BudgetCode##', budValues);
                body = body.replace('##EditLocation##', nullckeck(val.LocationofEdit));
                body = body.replace('##AirDate##', nullckeck(val.AirDate));
                body = body.replace('##Correspondent##', nullckeck(val.Correspondent));
                var Plece = "Yes";
                if (val.PleceTBD == "No") {
                    Plece = nullckeck(val.PleceMinutes) + ":" + nullckeck(val.PleceSeconds)
                }
                else {
                    Plece = nullckeck(val.PleceTBD) 
                }
                body = body.replace('##LengthOfShot##', Plece);
                body = body.replace('##EditStartDate##', nullckeck(val.EditStartDate));
                body = body.replace('##RequestedEditSection##', nullckeck(val.RequestedEditSection));
                body = body.replace('##IsCrashEdit##', nullckeck(val.IsCrashEdit));
                body = body.replace('##IsFieldEditing##', nullckeck(val.IsFieldEditing));
                body = body.replace('##Isrecut##', nullckeck(val.Isrecut));
                body = body.replace('##IsCraftEditBrollTeasesVosSOTS##', nullckeck(val.IsCraftEditBrollTeasesVosSOTS));
                body = body.replace('##ERCREditedBy##', nullckeck(val.ERCREditedBy));
                if (val.EditType === "Long Form Edit Request") {
                    body = body.replace('##EditTimeNeeded##', nullckeck(val.CraftEditWeeks) + " : " + nullckeck(val.CraftEditDays) + " : " + nullckeck(val.CraftEditHours));
                }
                else {
                    body = body.replace('##EditTimeNeeded##', nullckeck(val.CraftEditDays) + " : " + nullckeck(val.CraftEditHours) + " : " + nullckeck(val.CraftEditMinutes));
                }
                var addReq = "";
                if (val.AMMusic == "Yes") {
                    addReq += "Music, "
                }
                if (val.AMGraphicStills == "Yes") {
                    addReq += "Graphics/Stills, "
                }
                if (val.AMColorCorrect == "Yes") {
                    addReq += "Color Correct, "
                }
                if (val.AMAudioCorrect == "Yes") {
                    addReq += "Audio Correct, "
                }
                if (val.AMEffects == "Yes") {
                    addReq += "Effects, "
                }
                if (val.AMOther == "Yes") {
                    addReq += "Other- ";
                    addReq += nullckeck(val.AROtherText) + ", "
                }
                if (val.AMAllOfTheAbove == "Yes") {
                    addReq += "All of the Above"
                }
                body = body.replace('##AdditionalRequirement##', nullckeck(val.ERCREditedBy));
                body = body.replace('##Comments##', nullckeck(val.CraftEditComments));
                var subject = 'New Edit Request ' + nullckeck(val.EditRequestID);
                var from = 'MTASharePointDEV@nbcuni.com';
                var to = [];
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
                if (!!val.AssistantProducerKey) {
                    var toAssistantProducer = val.AssistantProducerKey.split(';');
                    $.each(toAssistantProducer, function (toInd, toVal) {
                        if (!!toVal) {
                            to.push(toVal);
                        }
                    })
                }

                var cc = [];
                var bcc = [];
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
        initializePeoplePicker: this.initializePeoplePicker,
        clearPeoplePicker: this.clearPeoplePicker,
        initializePeoplePickerValue: this.initializePeoplePickerValue,
        ReadList: this.ReadList,
        parseDate: this.parseDate,
        daydiff: this.daydiff,
        addItem: this.addItem,
        updateItem: this.updateItem,
        deleteItem: this.deleteItem,
        saveID: this.saveID,
        isValidPhoneNo: this.isValidPhoneNo,
        dateParse: this.dateParse,
        room: this.room,
        lfSaveID: this.lfSaveID,
        MSNBCSaveID: this.MSNBCSaveID,
        TdySaveID: this.TdySaveID,
        getCrewRequestID: this.getCrewRequestID,
        addZero: this.addZero,
        business: this.business,
        LocationOfEdit: this.LocationOfEdit,
        labelSelection: this.labelSelection,
        requestorKey: this.requestorKey,
        sendEmail: this.sendEmail,
        network: this.network
    }
}();
