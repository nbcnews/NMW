NBCU.TdyWtdyFulfiller.Helper = function () {
    this.saveID = 0;

    this.addZero = {
        1: "0000",
        2: "000",
        3: "00",
        4: "0"
    };

    var serverurl = location.protocol + "//" + location.host;
    var serverPath = serverurl + "/sites/bcast_prodreq/_api/Web/Lists";
    var date = new Date();
    var FileIngestIdPrefix = "ER" + date.getFullYear();

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

    this.getFileIngestID = function (FileId) {
        var FIID = FileIngestIdPrefix;
        var fileIdLength = FileId.toString().length;
        if (fileIdLength <= 4) {
            FIID = FIID + addZero[fileIdLength] + FileId;
        }
        else {
            FIID = FIID + FileId;
        }
        return FIID;
    };

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
        getFileIngestID: this.getFileIngestID
    }
}();
