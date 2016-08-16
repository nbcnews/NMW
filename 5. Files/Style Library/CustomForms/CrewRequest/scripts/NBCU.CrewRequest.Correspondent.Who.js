NBCU.CrewRequest.Correspondent.Who = function () {
    var validCheck = true;
    var whoPageData = [];

    this.clsUpdateContactDetails = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
            });
        }

        event.stopPropagation();
    };

    function initializePeoplePickerCLS(peoplePickerElementId, allowMultiples) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = allowMultiples;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        var users = new Array(1);
        //users[0] = defaultUser;      // Render and initialize the picker. 
        //// Pass the ID of the DOM element that contains the picker, an array of initial
        //// PickerEntity objects to set the picker value, and a schema that defines
        //// picker properties.
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    function initializePeoplePickerControlCLS(peoplePickerElementId, displayValue) {
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
        ////defaultUser.AutoFillDisplayText = user.get_title();  
        ////defaultUser.AutoFillKey = "chennai\\karthiksp";
        ////defaultUser.Description = user.get_email();  
        defaultUser.DisplayText = displayValue;
        defaultUser.EntityType = "User";
        defaultUser.IsResolved = true;
        ////defaultUser.Key = "chennai\\karthiksp";
        defaultUser.Resolved = true;
        users[0] = defaultUser;      // Render and initialize the picker. 
        //// Pass the ID of the DOM element that contains the picker, an array of initial
        //// PickerEntity objects to set the picker value, and a schema that defines
        //// picker properties.
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    function getValidate() {
        validCheck = true;
        if ($('#CLSrequestermobile').text() == "" && $('#CLSrequestermobile').prev().val() == "") {
            $('#CLSrequestermobile').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#CLSrequestermobile').next().hide();
        }
        if ($('#peoplePickerProducerClsDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerProducerClsDiv').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#peoplePickerProducerClsDiv').next().hide();
        }
        if ($('#CLSproducermobile').text() == "" && $('#CLSproducermobile').prev().val() == "") {
            $('#CLSproducermobile').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#CLSproducermobile').next().hide();
        }
        return validCheck;
    };

    /** Compare old data with new data to update **/
    function compareArray(oldArray, newArray) {
        var found = false;
        $.each(oldArray, function (index, old_obj) {
            var firstArrayValue = old_obj;
            var oldIndex = index
            $.each(newArray, function (new_index, new_obj) {
                var secondArrayValue = new_obj[oldIndex];
                if (secondArrayValue != firstArrayValue && typeof (secondArrayValue) != "object") {
                    found = true;
                    return false;
                }
            });
        });
        return found;
    }

    function returnKeyProducer() {
        var returnVal = "";
        if ($('#isproducerCLS').val() == "Yes") {
            returnVal = NBCU.CrewRequest.Helper.requestorKey;
        }
        else {
            $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerClsDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
                returnVal += val.Key + ";";
            })
        }
        return returnVal;
    }

    function returnKeyAdditionRequest() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAdditionalUsersClsDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    function collectData(additionalUser) {
        var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var tomm = year + "/" + month + "/" + day;

        var data = {
            __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
            Requester: $('#CLSrequester').text().trim(),
            Title: $('#CLSrequester').text().trim(),
            CellPhone1: ($('#CLSrequestermobile').text().trim() == "") ? $('#CLSrequestermobile').prev().val().trim() : $('#CLSrequestermobile').text().trim(),
            DeskNumber: ($('#CLSrequesterdesk').text().trim() == "") ? $('#CLSrequesterdesk').prev().val().trim() : $('#CLSrequesterdesk').text().trim(),
            ProducerSameAsRequestor: $('#isproducerCLS option:selected').text().trim(),
            IsThereAnOnsiteProducer: $('#isonsiteCLS option:selected').text().trim(),
            Producer: $('#peoplePickerProducerClsDiv_TopSpan span.ms-entity-resolved').text().trim(), //producerName,
            ProducerCellNumber: ($('#CLSproducermobile').text().trim() == "") ? $('#CLSproducermobile').prev().val().trim() : $('#CLSproducermobile').text().trim(),
            ProducerDeskNumber: ($('#CLSproducerdesk').text().trim() == "") ? $('#CLSproducerdesk').prev().val().trim() : $('#CLSproducerdesk').text().trim(),
            CCEmail: additionalUser,
            CrewType: NBCU.CrewRequest.Helper.CrewType.Correspondent,
            CrewStatus: 'Step1',
            requestorKey: NBCU.CrewRequest.Helper.requestorKey,
            producerKey: returnKeyProducer(),
            CCEmailKey: returnKeyAdditionRequest(),
            StartDate1: tomm,
            EndDate1: tomm,
        };
        return data;
    }

    /** Save/Update data ***/
    this.clsSaveUser = function () {
        validCheck = getValidate();
        var additionalUser = '';
        var dataSaved = false;
        if ($('#peoplePickerAdditionalUsersClsDiv_TopSpan span.ms-entity-resolved').length > 1) {
            $.each($('#peoplePickerAdditionalUsersClsDiv_TopSpan span.ms-entity-resolved'), function (ind, val) {
                if (ind == $('#peoplePickerAdditionalUsersClsDiv_TopSpan span.ms-entity-resolved').length - 1) {
                    additionalUser = additionalUser + $(val).text().trim();
                }
                else {
                    additionalUser = additionalUser + $(val).text().trim() + " | ";
                }
            });
        }
        else {
            additionalUser = $('#peoplePickerAdditionalUsersClsDiv_TopSpan span.ms-entity-resolved').val();
        }

        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && NBCU.CrewRequest.Helper.clsSaveID == 0) {
            var data = collectData(additionalUser);

            var savedata = NBCU.CrewRequest.Helper.addItem(data, 'CrewRequest');
            NBCU.CrewRequest.Helper.clsSaveID = savedata.d.Id;
            NBCU.CrewRequest.Helper.whoPageData.push(data);
            dataSaved = true;
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="CLSwhatPage"]').attr('title').trim() : $(this).attr('next').trim());
        }
        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && !dataSaved) {
            var getData = [];
            getData.push(collectData(additionalUser))
            var checkNewData = compareArray(NBCU.CrewRequest.Helper.whoPageData[0], getData);
            if (checkNewData) {
                NBCU.CrewRequest.Helper.updateItem(getData[0], 'CrewRequest', NBCU.CrewRequest.Helper.clsSaveID);
                NBCU.CrewRequest.Helper.whoPageData = [];
                NBCU.CrewRequest.Helper.whoPageData.push(getData[0]);
            }
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="CLSwhatPage"]').attr('title').trim() : $(this).attr('next').trim());
        }

    }

    function getUserProperties(targetUser) {
        SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function () {
            // Get the current client context and PeopleManager instance.
            var clientContext = new SP.ClientContext.get_current();
            var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
            // Get user properties for the target user.
            // To get the PersonProperties object for the current user, use the
            // getMyProperties method.
            personProperties = peopleManager.getPropertiesFor(targetUser);
            // Load the PersonProperties object and send the request.
            clientContext.load(personProperties);
            clientContext.executeQueryAsync(onRequestSuccess1, onRequestFail1);
        });
    }

    function onRequestSuccess1() {
        var phoneNo = personProperties.get_userProfileProperties()['CellPhone'];
        var deskNo = personProperties.get_userProfileProperties()['WorkPhone'];
        //var email = personProperties.get_userProfileProperties()['WorkEmail'];
        //alert(email);
        $('#CLSproducermobile').text(phoneNo);
        $('#CLSproducermobile').prev().val(phoneNo);
        $('#CLSproducerdesk').text(deskNo);
        $('#CLSproducerdesk').prev().val(deskNo);

        var peoplePickerId = 'peoplePickerProducerClsDiv';
        var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + '_TopSpan'];

        //get selected users and select the second user (index 1) to remove
        var selectedUsers = peoplePicker.GetAllUserInfo();
        var userToRemoveKey = selectedUsers[1].Key;

        var resovledListElmId = peoplePicker.ResolvedListElementId;
        var elementToRemove = '';
        $('#' + resovledListElmId).children().each(function (index, element) {
            if (element.id.startsWith(peoplePickerId + '_TopSpan_' + userToRemoveKey + '_ProcessedUser')) {
                elementToRemove = element;
                return false;
            }
        });
        peoplePicker.DeleteProcessedUser(elementToRemove);
    }

    function onRequestFail1(sender, args) {
        console.log('fail');
    }

    /* ------------- Init ------------------------ */

    this.Init = function () {
        $('.display-data1-login').text($('.display-data1:eq(0)').text());
        initializePeoplePickerCLS('peoplePickerProducerClsDiv', false);
        SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerClsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#CLSproducermobile').text("");
                $('#CLSproducermobile').prev().val("");
                $('#CLSproducerdesk').text("");
                $('#CLSproducerdesk').prev().val("");
            }
        };
        initializePeoplePickerCLS('peoplePickerAdditionalUsersClsDiv', true);
        $(document).off().on("click", "#CLSwhoPage .button-edit-cls", this.clsUpdateContactDetails);
        $('#CLSwhoPage span[title="CLSNext"]').unbind('click');
        $('#CLSwhoPage span[title="CLSNext"]').bind('click', this.clsSaveUser);
        if ($('#isproducerCLS').val() == 'Yes') {
            $('#CLSproducermobile').text($('#CLSrequestermobile').text());
            $('#CLSproducerdesk').text($('#CLSrequesterdesk').text());
            $('#CLSproducermobile').prev().val($('#CLSrequestermobile').text());
            $('#CLSproducerdesk').prev().val($('#CLSrequesterdesk').text());
            initializePeoplePickerControlCLS('peoplePickerProducerClsDiv', $('.display-data1-login:eq(0)').text());
            //peoplePickerProducerClsDiv
            SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerClsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                //console.log('inside OnUserResolvedClientScript');
                if (selectedUsersInfo.length == 1) {
                    ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                }
                else {
                    $('#CLSproducermobile').text("");
                    $('#CLSproducermobile').prev().val("");
                    $('#CLSproducerdesk').text("");
                    $('#CLSproducerdesk').prev().val("");
                }
            };
            $('#peoplePickerProducerClsDiv').hide();
            $('#clsproducer').text($('#requester').text());
            $('#clsproducer').show();
        }

        $('#isproducerCLS').change(function () {
            validCheck = true

            if ($('#CLSrequestermobile').text() == "" && $('#CLSrequestermobile').prev().val() == "") {
                $('#CLSrequestermobile').next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#CLSrequestermobile').next().hide();
                $('#CLSproducermobile').next().hide();
            }
            if (validCheck) {
                if ($(this).val() == "Yes") {
                    if ($('#CLSrequestermobile').is(":visible")) {
                        $('#CLSproducermobile').text($('#CLSrequestermobile').text());
                        $('#CLSproducerdesk').text($('#CLSrequesterdesk').text());
                        $('#CLSproducermobile').prev().val($('#CLSrequestermobile').text());
                        $('#CLSproducerdesk').prev().val($('#CLSrequesterdesk').text());
                    }
                    else {
                        $('#CLSproducermobile').prev().val($('#CLSrequestermobile').prev().val());
                        $('#CLSproducerdesk').prev().val($('#CLSrequesterdesk').prev().val());
                        $('#CLSproducermobile').text($('#CLSrequestermobile').prev().val());
                        $('#CLSproducerdesk').text($('#CLSrequesterdesk').prev().val());
                    }
                    initializePeoplePickerControlCLS('peoplePickerProducerClsDiv', $('.display-data1-login:eq(0)').text());
                    SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerClsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                        //console.log('inside OnUserResolvedClientScript');
                        if (selectedUsersInfo.length == 1) {
                            ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                        }
                        else {
                            $('#CLSproducermobile').text("");
                            $('#CLSproducermobile').prev().val("");
                            $('#CLSproducerdesk').text("");
                            $('#CLSproducerdesk').prev().val("");
                        }
                    };
                    $('#peoplePickerProducerClsDiv').hide();
                    $('#clsproducer').text($('#requester').text());
                    $('#clsproducer').show();
                }
                else {
                    $('#CLSproducermobile').text("");
                    $('#CLSproducerdesk').text("");
                    $('#CLSproducermobile').prev().val("");
                    $('#CLSproducerdesk').prev().val("");
                    $('#clsproducer').text('');
                    $('#clsproducer').hide();
                    $('#peoplePickerProducerClsDiv').show();
                    initializePeoplePickerCLS('peoplePickerProducerClsDiv', false);
                    SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerClsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                        //console.log('inside OnUserResolvedClientScript');
                        if (selectedUsersInfo.length == 1) {
                            ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                        }
                        else {
                            $('#CLSproducermobile').text("");
                            $('#CLSproducermobile').prev().val("");
                            $('#CLSproducerdesk').text("");
                            $('#CLSproducerdesk').prev().val("");
                        }
                    };
                    $('#CLSrequestermobile').next().hide();
                    $('#CLSrequesterdesk').next().hide();
                }
            }
            else {
                if ($(this).val() !== "No") {
                    $(this).val("");
                }
            }
            event.stopPropagation();
        });

        $('#CLSrequestermobile, #CLSrequesterdesk, #CLSproducermobile, #CLSproducerdesk').prev().keydown(function (e) {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });
        $('#CLSwhoPage .button-add-app-cls').click(function () {
            $(this).parent().prev().show();
            $(this).hide()
        });

        $('#CLSwhoPage .button-remove-sp-cls').click(function () {
            $(this).closest(".row-dynamic").hide();
            $('#CLSwhoPage .button-add-app-cls').show();
        });

        $('#CorrespondentLiveShot span[title="CLSwhatPage"]').unbind('click');
        $('#CorrespondentLiveShot span[title="CLSwhatPage"]').bind('click', this.clsSaveUser);
        $('#CorrespondentLiveShot span[title="CLSwhatPage"]').css('cursor', 'pointer');
        $('#CorrespondentLiveShot span[title="CLSwherePage"]').css('cursor', '');
        $('#CorrespondentLiveShot span[title="CLSwherePage"]').unbind('click');
        $('#CorrespondentLiveShot span[title="CLSwhenPage"]').css('cursor', '');
        $('#CorrespondentLiveShot span[title="CLSwhenPage"]').unbind('click');

    }

}
NBCU.CrewRequest.Correspondent.Who.prototype.PostBack = false;