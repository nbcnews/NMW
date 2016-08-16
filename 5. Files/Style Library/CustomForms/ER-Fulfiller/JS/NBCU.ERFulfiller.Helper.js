NBCU.ERFulfiller.Helper = function () {
    this.saveID = 0;
    this.staticEditRequestID = 0;
    this.whoPageData = [];
    this.whatPageTalentData = [];
    this.whatPageShowUnitData = [];
    this.whenPageShootData = [];
    this.dataTalentSaved = false;
    this.dataShowUnitSaved = false;
    this.dataShootSaved = false;
    this.txtUnit = 0;
    this.txtEditor = 0;
    this.cntTalent = 0;
    this.cntResource = 0;
    this.newCrewRequestData = {};
    this.network = [];
    var serverurl = location.protocol + "//" + location.host

    this.timeZone = {
        "Eastern Daylight Time": "ET",
        "Eastern Standard Time": "ET",
        "Central Daylight Time": "CT",
        "Central Standard Time": "CT",
        "Mountain Daylight Time": "MT",
        "Mountain Standard Time": "MT",
        "Pacific Daylight Time": "PT",
        "Pacific Standard Time": "PT",
        "Greenwich Mean Time": "GMT",
        "Alaska Daylight Time": "AKT",
        "Alaska Standard Time": "AKT",
        "Russia Standard Time": "MSK",
        "Central Standard Time": "CST"
    }

    /** Get the data from list with the respective id **/
    this.ReadList = function (url, listName, id) {
        var results = [];
        try {
            $.ajax({
                url: serverurl + "/sites/bcast_prodreq/_api/Web/Lists/GetByTitle('" + listName + "')/items(" + id + ")",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                async: false,
                success: function (data) {
                    results = data.d;
                    return results;
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

    /** Get the data from list with the respective query **/
    this.ReadListData = function (url, listName, query) {
        var results = [];
        try {
            $.ajax({
                url: serverurl + "/sites/bcast_prodreq/_api/Web/Lists/GetByTitle('" + listName + "')/items" + query,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                async: false,
                success: function (data) {
                    results = data.d.results;
                    return results;
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

    /** Get the story with the respective query **/
    this.getStory = function () {
        var resultArray = [];
        try {
            $.ajax({
                url: "https://samurai.cnbc.com/Search/?format=brief&maxReturn=10&wireInclude=LU&scope=headline&query=trum*",
                data: "{}",
                type: "GET",
                contentType: "application/javascript",
                dataType: "jsonp",
                async: false,
                error: function (data) {
                    console.log(data);
                },
                success: function (data) {
                    resultArray = data;
                }
            });
            return resultArray;
        } catch (e) {
            console.log(e.message);
        }
    }

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
                url: serverurl + "/sites/bcast_prodreq/_api/Web/Lists/GetByTitle('" + listName + "')/items",
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
                url: "/sites/bcast_prodreq/_api/Web/Lists/GetByTitle('" + listName + "')/items(" + id + ")",
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
                url: "/sites/bcast_prodreq/_api/Web/Lists/GetByTitle('" + listName + "')/items(" + id + ")",
                type: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-Http-Method": "DELETE",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "If-Match": "*"
                },
                async: false,
                success: function (data) {
                    console.log("Delete Sucess");
                },
                error: function (error) {
                    console.log("Delete Error");
                }
            });
        } catch (e) {
            console.log(e.message);
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

    /** convert time to 12hrs with AM/PM **/
    this.tConvert = function(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }

    /** Format the string **/
    this.stringFormat = function(str, args) {
        var strRegex = new RegExp("{-?[0-9]+}", "g");
        return str.replace(strRegex, function (item) {
            var intVal = parseInt(item.substring(1, item.length - 1));
            var replace;
            if (intVal >= 0) {
                replace = args[intVal];
            } else if (intVal === -1) {
                replace = "{";
            } else if (intVal === -2) {
                replace = "}";
            } else {
                replace = "";
            }
            return replace;
        });
    };

    this.checkRemove = function (list, crewID, Field) {
        var getData = this.ReadListData("/sites/NMWF", list, "?$select=ID&$filter=" + Field + "" + "  eq '" + crewID + "'");
        if (getData.length > 0) {
            var metaDataList = list;
            metaDataList = metaDataList.replace('_', '_x005f_');
            metaDataList = { 'type': "SP.Data." + metaDataList + "ListItem" };
            $.each(getData, function (index, val) {
                var data = {
                    __metadata: metaDataList,
                    ID: val.ID
                };
                NBCU.ERFulfiller.Helper.deleteItem(data, list, val.ID);
            })
        }
    }

    this.datePickerLoad = function (calendarIconElement, calendarElement, calendarTextElement) {
        calendarIconElement.dateRangePicker({
            inline: true,
            mode: 'single',
            container: calendarElement,
            alwaysOpen: false,
            singleMonth: true,
            stickyMonths: true,
            autoClose: true,
            singleDate: true,
            getValue: function () {
                return this.innerHTML;
            },
            setValue: function (s0) {
                calendarTextElement.val(s0);
            }
        });
    }

    return {
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
        txtEditor: this.txtEditor,
        cntTalent: this.cntTalent,
        cntResource : this.cntResource,
        staticEditRequestID: this.staticEditRequestID,
        ReadListData: this.ReadListData,
        newCrewRequestData: this.newCrewRequestData,
        tConvert: this.tConvert,
        timeZone: this.timeZone,
        getStory: this.getStory,
        stringFormat: this.stringFormat,
        checkRemove: this.checkRemove,
        datePickerLoad: this.datePickerLoad,
        network: this.network
    }
}();
