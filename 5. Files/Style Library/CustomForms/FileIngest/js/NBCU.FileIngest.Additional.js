NBCU.FileIngest.Additional = function () {

    function collectData() {
        var cameraTypes = "";
        var otherText = "";

        var data = {
            __metadata: { 'type': 'SP.Data.FileIngestListItem' },
            ContentDescription: $('#fi-contentDesc').val(),
            CrewShooter: $('#fi-crewShooter').val(),
            CrewRequestID: $('#fi-crewRequestID').val(),
            AlternateEmails: $('#fi-alternateEmails').val(),
            IsExternalHardDrive: $('input[name="exteranlHD"]:checked').val(),
            fiComments: $('#fi-comments').val(),
            IngestStatus: "FormComplete",
            MaterialWorkgroup: $('.workgroupYes select').val()
        };
        return data;
    }

    function validTextbox(element) {
        var valid = true;
        if (element.val() == "") {
            element.next().show();
            valid = false;
        }
        else {
            element.next().hide();
            valid = true;
        }
        return valid;
    }

    function validation() {
        var valid = true;
        valid = validTextbox($('#fi-contentDesc'));
        if ($('#FLN-Additional .valid-msg-error').is(":visible")) {
            valid = false;
        }
        return valid;
    }

    this.saveItem = function () {
        if (validation()) {
            var data = collectData();
            if (NBCU.FileIngest.Helper.saveID != 0) {
                NBCU.FileIngest.Helper.updateItem(data, 'FileIngest', NBCU.FileIngest.Helper.saveID);
            }
            NBCU.FileIngest.Master.redirectPage("Submit");
        }
    }

    /**Fetching the document from list**/
    function getCrewDoc(CRid) {
        var returnArray = [];
        try {
            $.ajax({
                url: "/sites/bcast_prodreq/_vti_bin/listdata.svc/MWFDocument?$select=Id,AssociatedRequestID,Name,RequestType&$filter=AssociatedRequestID eq '" + CRid + "' and RequestType eq 'File Ingest'",
                dataType: 'json',
                processData: false,
                async: false,
                success: function (data) {
                    $.each(data.d.results, function (i, item) {
                        returnArray.push({
                            id: item.Id,
                            CRid: item.AssociatedRequestID,
                            Name: item.Name
                        });
                    });
                }
            });
            return returnArray;

        } catch (e) {
            console.log(e.message)
        }
    }

    // Upload the file.
    // You can upload files up to 2 GB with the REST API.
    function uploadFile() {

        // Define the folder path for this example.
        var serverRelativeUrlToFolder = '/sites/bcast_prodreq/MWFDocument';

        // Get test values from the file input and text input page controls.
        var fileInput = jQuery('#getFile');
        var newName = jQuery('#displayName').val();

        // Get the server URL.
        var serverUrl = _spPageContextInfo.webAbsoluteUrl;

        // Initiate method calls using jQuery promises.
        // Get the local file as an array buffer.
        var getFile = getFileBuffer();
        getFile.done(function (arrayBuffer) {

            // Add the file to the SharePoint folder.
            var addFile = addFileToFolder(arrayBuffer);
            addFile.done(function (file, status, xhr) {

                // Get the list item that corresponds to the uploaded file.
                var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
                getItem.done(function (listItem, status, xhr) {

                    // Change the display name and title of the list item.
                    var changeItem = updateListItem(listItem.d.__metadata);
                    changeItem.done(function (data, status, xhr) {
                        //alert('file uploaded and updated');

                        var docItems = getCrewDoc(NBCU.FileIngest.Helper.saveID);
                        var docItemsHTML = "";
                        $.each(docItems, function (ind, val) {
                            docItemsHTML += "<a href='/sites/bcast_prodreq/MWFDocument/" + val.Name + "'>" + val.Name + "</a> <br />";
                        })
                        $('.browfe-info').html(docItemsHTML);
                    });
                    changeItem.fail(onError);
                });
                getItem.fail(onError);
            });
            addFile.fail(onError);
        });
        getFile.fail(onError);
        // Get the local file as an array buffer.
        function getFileBuffer() {
            var deferred = jQuery.Deferred();
            var reader = new FileReader();
            reader.onloadend = function (e) {
                deferred.resolve(e.target.result);
            }
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            }
            reader.readAsArrayBuffer(fileInput[0].files[0]);
            return deferred.promise();
        }

        // Add the file to the file collection in the Shared Documents folder.
        function addFileToFolder(arrayBuffer) {

            // Get the file name from the file input control on the page.
            var parts = fileInput[0].value.split('\\');
            var fileName = parts[parts.length - 1];

            // Construct the endpoint.
            var fileCollectionEndpoint = String.format(
                    "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                    "/add(overwrite=true, url='{2}')",
                    serverUrl, serverRelativeUrlToFolder, fileName);

            // Send the request and return the response.
            // This call returns the SharePoint file.
            return jQuery.ajax({
                url: fileCollectionEndpoint,
                type: "POST",
                data: arrayBuffer,
                processData: false,
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                    "content-length": arrayBuffer.byteLength
                }
            });
        }

        // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
        function getListItem(fileListItemUri) {

            // Send the request and return the response.
            return jQuery.ajax({
                url: fileListItemUri,
                type: "GET",
                headers: { "accept": "application/json;odata=verbose" }
            });
        }

        // Change the display name and title of the list item.
        function updateListItem(itemMetadata) {

            // Define the list item changes. Use the FileLeafRef property to change the display name.
            // For simplicity, also use the name as the title.
            // The example gets the list item type from the item's metadata, but you can also get it from the
            // ListItemEntityTypeFullName property of the list.
            //var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','AssociatedRequestID':'{3}','RequestType':'{4}'}}",
            //    itemMetadata.type, newName, newName,"23","Crew Request");

            var body = String.format("{{'__metadata':{{'type':'{0}'}},'AssociatedRequestID':'{1}','RequestType':'{2}'}}",
                itemMetadata.type, NBCU.FileIngest.Helper.saveID, "File Ingest");

            // Send the request and return the promise.
            // This call does not return response content from the server.
            return jQuery.ajax({
                url: itemMetadata.uri,
                type: "POST",
                data: body,
                headers: {
                    "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                    "content-type": "application/json;odata=verbose",
                    "content-length": body.length,
                    "IF-MATCH": itemMetadata.etag,
                    "X-HTTP-Method": "MERGE"
                }
            });
        }
    }
    // Display error messages.
    function onError(error) {
        //alert(error.responseText);
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        $('#FLN-Additional span[title="Submit"]').unbind('click');
        $('#FLN-Additional span[title="Submit"]').bind('click', this.saveItem);
        $('input[name="exteranlHD"]').unbind('click');
        $('input[name="exteranlHD"]').click(function () {
            if ($('input[name="exteranlHD"]:checked').val() == "Yes") {
                $('.workgroupYes').show();
            }
            else if ($('input[name="exteranlHD"]:checked').val() == "No") {
                $('.workgroupYes').hide();
            }
        });
        $('.file-attach').unbind('click');
        $('.file-attach').click(function () {
            if (NBCU.FileIngest.Helper.saveID != 0) {
                if (!!$('#getFile').val()) {
                    uploadFile();
                }
                else {
                    alert('Please Select file for upload');
                }
            }
        });
    }
}

NBCU.FileIngest.Additional.prototype.PostBack = false;