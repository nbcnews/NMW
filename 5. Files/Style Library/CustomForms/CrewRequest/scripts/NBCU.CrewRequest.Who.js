NBCU.CrewRequest.Who = function () {
    var validCheck = true;
    var whoPageData = [];

    this.gcrUpdateContactDetails = function (event) {
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

    this.AddUsers = function () {
        $('.additionrequestDiv').show();
        $(this).hide();
    };

    this.gcrRemoveUser = function () {
        $('.additionrequestDiv').hide();
        $('.button-add-app').show();
        var ppobject = SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerAdditionRequestDiv_TopSpan'];
        var usersobject = ppobject.GetAllUserInfo();
        usersobject.forEach(function (index) {
            ppobject.DeleteProcessedUser(usersobject[index]);
        });
    };

    function initializePeoplePicker(peoplePickerElementId) {
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
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    function initializePeoplePickerControl(peoplePickerElementId, displayValue) {
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
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }


    function getValidate() {
        validCheck = true;
        if ($('#requestermobile').text() == "" && $('#requestermobile').prev().val() == "") {
            $('#requestermobile').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#requestermobile').next().hide();
        }
        if ($('#peoplePickerProducerDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerProducerDiv').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#peoplePickerProducerDiv').next().hide();
        }
        if ($('#producermobile').text() == "" && $('#producermobile').prev().val() == "") {
            $('#producermobile').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#producermobile').next().hide();
        }

        if ($('#peoplePickerApproverDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerApproverDiv').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#peoplePickerApproverDiv').next().hide();
        }
        return validCheck;
    };

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
        if ($('#isproducer').val() == "Yes") {
            returnVal = NBCU.CrewRequest.Helper.requestorKey + ";";
        }
        else {
            $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
                returnVal += val.Key + ";";
            })
        }
        return returnVal;
    }

    function returnKeySeniorProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerApproverDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    function returnKeyAdditionRequest() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAdditionRequestDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    function collectData(additionalUser) {

        var data = {
            __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
            Requester: $('#requester').text().trim(),
            Title: $('#requester').text().trim(),
            CellPhone1: ($('#requestermobile').text().trim() == "") ? $('#requestermobile').prev().val().trim() : $('#requestermobile').text().trim(),
            DeskNumber: ($('#requesterdesk').text().trim() == "") ? $('#requesterdesk').prev().val().trim() : $('#requesterdesk').text().trim(),
            ProducerSameAsRequestor: $('#isproducer option:selected').text().trim(),
            IsThereAnOnsiteProducer: $('#isonsite option:selected').text().trim(),
            Producer: $('#peoplePickerProducerDiv_TopSpan span.ms-entity-resolved').text().trim(), //producerName,
            ProducerCellNumber: ($('#producermobile').text().trim() == "") ? $('#producermobile').prev().val().trim() : $('#producermobile').text().trim(),
            ProducerDeskNumber: ($('#producerdesk').text().trim() == "") ? $('#producerdesk').prev().val().trim() : $('#producerdesk').text().trim(),
            Approver: $('#peoplePickerApproverDiv_TopSpan span.ms-entity-resolved').text().trim(), //approverName,
            CCEmail: additionalUser,
            CrewType: NBCU.CrewRequest.Helper.CrewType.General,
            CrewStatus: 'Step1',
            requestorKey: NBCU.CrewRequest.Helper.requestorKey,
            producerKey: returnKeyProducer(),
            SeniorProducerKey: returnKeySeniorProducer(),
            CCEmailKey: returnKeyAdditionRequest()
        };
        return data;
    }

    this.saveUser = function () {
        validCheck = getValidate();
        var additionalUser = '';
        var dataSaved = false;
        if ($('#peoplePickerAdditionRequestDiv_TopSpan span.ms-entity-resolved').length > 1) {
            $.each($('#peoplePickerAdditionRequestDiv_TopSpan span.ms-entity-resolved'), function (ind, val) {
                if (ind == $('#peoplePickerAdditionRequestDiv_TopSpan span.ms-entity-resolved').length - 1) {
                    additionalUser = additionalUser + $(val).text();
                }
                else {
                    additionalUser = additionalUser + $(val).text() + " | ";
                }
            });
        }
        else {
            additionalUser = $('#peoplePickerAdditionRequestDiv_TopSpan span.ms-entity-resolved').text();
        }

        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && NBCU.CrewRequest.Helper.saveID == 0) {
            var data = collectData(additionalUser);

            var savedata = NBCU.CrewRequest.Helper.addItem(data, 'CrewRequest');
            NBCU.CrewRequest.Helper.saveID = savedata.d.Id;
            NBCU.CrewRequest.Helper.whoPageData.push(data);
            dataSaved = true;
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="What"]').attr('title').trim() : $(this).attr('next').trim());
        }
        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && !dataSaved) {
            var getData = [];
            getData.push(collectData(additionalUser))
            var checkNewData = compareArray(NBCU.CrewRequest.Helper.whoPageData[0], getData);
            if (checkNewData) {
                NBCU.CrewRequest.Helper.updateItem(getData[0], 'CrewRequest', NBCU.CrewRequest.Helper.saveID);
                NBCU.CrewRequest.Helper.whoPageData = [];
                NBCU.CrewRequest.Helper.whoPageData.push(getData[0]);
            }
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="What"]').attr('title').trim() : $(this).attr('next').trim());
        }
    }

    function getUserProperties(targetUser) {
        SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function () {
            // Replace the placeholder value with the target user's credentials.
            //var targetUser = "domainName\\userName";

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
        $('#producermobile').text(phoneNo);
        $('#producermobile').prev().val(phoneNo);
        $('#producerdesk').text(deskNo);
        $('#producerdesk').prev().val(deskNo);

        var peoplePickerId = 'peoplePickerProducerDiv';
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
       
        $(".button-add-app").unbind('click');
        $(".button-add-app").bind('click', this.AddUsers);
        $("#whoPage .button-remove-sp").unbind('click');
        $("#whoPage .button-remove-sp").bind('click', this.gcrRemoveUser);
        $('span[title="Next"]').unbind('click');
        $('span[title="Next"]').bind('click', this.saveUser);
        $('span[title="What"]').unbind('click');
        $('span[title="What"]').bind('click', this.saveUser);
        $('span[title="What"]').css('cursor', 'pointer');
        $('span[title="Where"]').css('cursor', '');
        $('span[title="When"]').css('cursor', '');
        $('span[title="Resources"]').css('cursor', '');
        $('span[title="Where"]').unbind('click');
        $('span[title="When"]').unbind('click');
        $('span[title="Resources"]').unbind('click');
        $(document).off().on("click", "#whoPage .button-edit-gcr", this.gcrUpdateContactDetails);
        if ($('#isproducer').val() == 'Yes') {
            $('#producermobile').text($('#requestermobile').text());
            $('#producerdesk').text($('#requesterdesk').text());
            $('#producermobile').prev().val($('#requestermobile').text());
            $('#producerdesk').prev().val($('#requesterdesk').text());
            initializePeoplePickerControl('peoplePickerProducerDiv', $('#requester').text());
            SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                //console.log('inside OnUserResolvedClientScript');
                if (selectedUsersInfo.length == 1) {
                    ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                }
                else {
                    $('#producermobile').text("");
                    $('#producermobile').prev().val("");
                    $('#producerdesk').text("");
                    $('#producerdesk').prev().val("");
                }
            };
            $('#peoplePickerProducerDiv').hide();
            $('#producer').text($('#requester').text());
            $('#producer').show();
        }
        $('#isproducer').unbind('change');
        $('#isproducer').change(function () {
            validCheck = true

            if ($('#requestermobile').text() == "" && $('#requestermobile').prev().val() == "") {
                $('#requestermobile').next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#requestermobile').next().hide();
                $('#producermobile').next().hide();
            }
            if (validCheck) {
                if ($(this).val() == "Yes") {
                    if ($('#requestermobile').is(":visible")) {
                        $('#producermobile').text($('#requestermobile').text());
                        $('#producerdesk').text($('#requesterdesk').text());
                        $('#producermobile').prev().val($('#requestermobile').text());
                        $('#producerdesk').prev().val($('#requesterdesk').text());
                    }
                    else {
                        $('#producermobile').prev().val($('#requestermobile').prev().val());
                        $('#producerdesk').prev().val($('#requesterdesk').prev().val());
                        $('#producermobile').text($('#requestermobile').prev().val());
                        $('#producerdesk').text($('#requesterdesk').prev().val());
                    }
                    initializePeoplePickerControl('peoplePickerProducerDiv', $('#requester').text());
                    SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                        //console.log('inside OnUserResolvedClientScript');
                        if (selectedUsersInfo.length == 1) {
                            ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                        }
                        else {
                            $('#producermobile').text("");
                            $('#producermobile').prev().val("");
                            $('#producerdesk').text("");
                            $('#producerdesk').prev().val("");
                        }
                    };
                    $('#peoplePickerProducerDiv').hide();
                    $('#producer').text($('#requester').text());
                    $('#producer').show();
                }
                else {
                    $('#producermobile').text("");
                    $('#producerdesk').text("");
                    $('#producermobile').prev().val("");
                    $('#producerdesk').prev().val("");
                    $('#producer').text('');
                    $('#producer').hide();
                    $('#peoplePickerProducerDiv').show();
                    initializePeoplePicker('peoplePickerProducerDiv');
                    SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                        //console.log('inside OnUserResolvedClientScript');
                        if (selectedUsersInfo.length == 1) {
                            ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                        }
                        else {
                            $('#producermobile').text("");
                            $('#producermobile').prev().val("");
                            $('#producerdesk').text("");
                            $('#producerdesk').prev().val("");
                        }
                    };
                }
            }
            else {
                $(this).val("");
            }
        });

        $('#requestermobile, #requesterdesk, #producermobile, #producerdesk').prev().unbind('keydown');
        $('#requestermobile, #requesterdesk, #producermobile, #producerdesk').prev().keydown(function (e) {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });
    }
}

NBCU.CrewRequest.Who.prototype.PostBack = false;