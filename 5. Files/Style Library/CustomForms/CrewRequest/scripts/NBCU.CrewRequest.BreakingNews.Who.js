NBCU.CrewRequest.BreakingNews.Who = function () {
    var validCheck = true;
    var whoPageData = [];

    this.bnsUpdateContactDetails = function (event) {
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

    function initializePeoplePickerBN(peoplePickerElementId, allowMultiples) {
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

    function initializePeoplePickerControlBN(peoplePickerElementId, displayValue) {
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
        if ($('#BNrequestermobile').text() == "" && $('#BNrequestermobile').prev().val() == "") {
            $('#BNrequestermobile').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#BNrequestermobile').next().hide();
        }
        if ($('#peoplePickerProducerbnsDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerProducerbnsDiv').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#peoplePickerProducerbnsDiv').next().hide();
        }
        if ($('#BNproducermobile').text() == "" && $('#BNproducermobile').prev().val() == "") {
            $('#BNproducermobile').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#BNproducermobile').next().hide();
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
        if ($('#isproducerBN').val() == "Yes") {
            returnVal = NBCU.CrewRequest.Helper.requestorKey + ";";
        }
        else {
            $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerbnsDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
                returnVal += val.Key + ";";
            })
        }
        return returnVal;
    }

    function returnKeyAdditionRequest() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAdditionalUsersbnsDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    function collectData(additionalUser) {
        var data = {
            __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
            Requester: $('#BNrequester').text().trim(),
            Title: $('#BNrequester').text().trim(),
            CellPhone1: ($('#BNrequestermobile').text().trim() == "") ? $('#BNrequestermobile').prev().val().trim() : $('#BNrequestermobile').text().trim(),
            DeskNumber: ($('#BNrequesterdesk').text().trim() == "") ? $('#BNrequesterdesk').prev().val().trim() : $('#BNrequesterdesk').text().trim(),
            ProducerSameAsRequestor: $('#isproducerBN option:selected').text().trim(),
            IsThereAnOnsiteProducer: $('#isonsiteBN option:selected').text().trim(),
            Producer: $('#peoplePickerProducerbnsDiv_TopSpan span.ms-entity-resolved').text().trim(), //producerName,
            ProducerCellNumber: ($('#BNproducermobile').text().trim() == "") ? $('#BNproducermobile').prev().val().trim() : $('#BNproducermobile').text().trim(),
            ProducerDeskNumber: ($('#BNproducerdesk').text().trim() == "") ? $('#BNproducerdesk').prev().val().trim() : $('#BNproducerdesk').text().trim(),
            CCEmail: additionalUser,
            CrewType: NBCU.CrewRequest.Helper.CrewType.Breaking,
            CrewStatus: 'Step1',
            requestorKey: NBCU.CrewRequest.Helper.requestorKey,
            producerKey: returnKeyProducer(),
            CCEmailKey: returnKeyAdditionRequest()
        };
        return data;
    }

    /** Save/Update data ***/
    this.bnsSaveUser = function () {
        validCheck = getValidate();
        var additionalUser = '';
        var dataSaved = false;
        if ($('#peoplePickerAdditionalUsersbnsDiv_TopSpan span.ms-entity-resolved').length > 1) {
            $.each($('#peoplePickerAdditionalUsersbnsDiv_TopSpan span.ms-entity-resolved'), function (ind, val) {
                if (ind == $('#peoplePickerAdditionalUsersbnsDiv_TopSpan span.ms-entity-resolved').length - 1) {
                    additionalUser = additionalUser + $(val).text().trim();
                }
                else {
                    additionalUser = additionalUser + $(val).text().trim() + " | ";
                }
            });
        }
        else {
            additionalUser = $('#peoplePickerAdditionalUsersbnsDiv_TopSpan span.ms-entity-resolved').text();
        }

        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && NBCU.CrewRequest.Helper.bnSaveID == 0) {
            var data = collectData(additionalUser);

            var savedata = NBCU.CrewRequest.Helper.addItem(data, 'CrewRequest');
            NBCU.CrewRequest.Helper.bnSaveID = savedata.d.Id;
            NBCU.CrewRequest.Helper.whoPageData.push(data);
            dataSaved = true;
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="bns-whatPage"]').attr('title').trim() : $(this).attr('next').trim());
        }
        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && !dataSaved) {
            var getData = [];
            getData.push(collectData(additionalUser))
            var checkNewData = compareArray(NBCU.CrewRequest.Helper.whoPageData[0], getData);
            if (checkNewData) {
                NBCU.CrewRequest.Helper.updateItem(getData[0], 'CrewRequest', NBCU.CrewRequest.Helper.bnSaveID);
                NBCU.CrewRequest.Helper.whoPageData = [];
                NBCU.CrewRequest.Helper.whoPageData.push(getData[0]);
            }
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="bns-whatPage"]').attr('title').trim() : $(this).attr('next').trim());
        }

    }

    /* ------------- Init ------------------------ */

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
        $('#BNproducermobile').text(phoneNo);
        $('#BNproducermobile').prev().val(phoneNo);
        $('#BNproducerdesk').text(deskNo);
        $('#BNproducerdesk').prev().val(deskNo);

        var peoplePickerId = 'peoplePickerProducerbnsDiv';
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

    this.Init = function () {
        $('.display-data1-login').text($('.display-data1:eq(0)').text());
        initializePeoplePickerBN('peoplePickerProducerbnsDiv', false);
        SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerbnsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#BNproducermobile').text("");
                $('#BNproducermobile').prev().val("");
                $('#BNproducerdesk').text("");
                $('#BNproducerdesk').prev().val("");
            }
        };


        initializePeoplePickerBN('peoplePickerAdditionalUsersbnsDiv', true);
        $(document).off().on("click", "#bns-whoPage .button-edit-bn", this.bnsUpdateContactDetails);
        $('#bns-whoPage span[title="bnNext"]').unbind('click');
        $('#bns-whoPage span[title="bnNext"]').bind('click', this.bnsSaveUser);
        if ($('#isproducerBN').val() == 'Yes') {
            $('#BNproducermobile').text($('#BNrequestermobile').text());
            $('#BNproducerdesk').text($('#BNrequesterdesk').text());
            $('#BNproducermobile').prev().val($('#BNrequestermobile').text());
            $('#BNproducerdesk').prev().val($('#BNrequesterdesk').text());
            initializePeoplePickerControlBN('peoplePickerProducerbnsDiv', $('.display-data1-login:eq(0)').text());
            SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerbnsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                //console.log('inside OnUserResolvedClientScript');
                if (selectedUsersInfo.length == 1) {
                    ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                }
                else {
                    $('#BNproducermobile').text("");
                    $('#BNproducermobile').prev().val("");
                    $('#BNproducerdesk').text("");
                    $('#BNproducerdesk').prev().val("");
                }
            };
            $('#peoplePickerProducerbnsDiv').hide();
            $('#bnsproducer').text($('#requester').text());
            $('#bnsproducer').show();
        }
        $('#isproducerBN').change(function () {
            validCheck = true

            if ($('#BNrequestermobile').text() == "" && $('#BNrequestermobile').prev().val() == "") {
                $('#BNrequestermobile').next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#BNrequestermobile').next().hide();
                $('#BNproducermobile').next().hide();
            }
            if (validCheck) {
                if ($(this).val() == "Yes") {
                    if ($('#BNrequestermobile').is(":visible")) {
                        $('#BNproducermobile').text($('#BNrequestermobile').text());
                        $('#BNproducerdesk').text($('#BNrequesterdesk').text());
                        $('#BNproducermobile').prev().val($('#BNrequestermobile').text());
                        $('#BNproducerdesk').prev().val($('#BNrequesterdesk').text());
                    }
                    else {
                        $('#BNproducermobile').prev().val($('#BNrequestermobile').prev().val());
                        $('#BNproducerdesk').prev().val($('#BNrequesterdesk').prev().val());
                        $('#BNproducermobile').text($('#BNrequestermobile').prev().val());
                        $('#BNproducerdesk').text($('#BNrequesterdesk').prev().val());
                    }
                    initializePeoplePickerControlBN('peoplePickerProducerbnsDiv', $('.display-data1-login:eq(0)').text());
                    SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerbnsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                        //console.log('inside OnUserResolvedClientScript');
                        if (selectedUsersInfo.length == 1) {
                            ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                        }
                        else {
                            $('#BNproducermobile').text("");
                            $('#BNproducermobile').prev().val("");
                            $('#BNproducerdesk').text("");
                            $('#BNproducerdesk').prev().val("");
                        }
                    };
                    $('#peoplePickerProducerbnsDiv').hide();
                    $('#bnsproducer').text($('#requester').text());
                    $('#bnsproducer').show();
                }
                else {
                    $('#BNproducermobile').text("");
                    $('#BNproducerdesk').text("");
                    $('#BNproducermobile').prev().val("");
                    $('#BNproducerdesk').prev().val("");
                    $('#bnsproducer').text('');
                    $('#bnsproducer').hide();
                    $('#peoplePickerProducerbnsDiv').show();
                    initializePeoplePickerBN('peoplePickerProducerbnsDiv', false);
                    SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerbnsDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
                        //console.log('inside OnUserResolvedClientScript');
                        if (selectedUsersInfo.length == 1) {
                            ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
                        }
                        else {
                            $('#BNproducermobile').text("");
                            $('#BNproducermobile').prev().val("");
                            $('#BNproducerdesk').text("");
                            $('#BNproducerdesk').prev().val("");
                        }
                    };
                    $('#BNrequestermobile').next().hide();
                    $('#BNproducermobile').next().hide();
                }
            }
            else {
                if ($(this).val() !== "No") {
                    $(this).val("");
                }
            }
            event.stopPropagation();
        });

        $('#BNrequestermobile, #BNrequesterdesk, #BNproducermobile, #BNproducerdesk').prev().keydown(function (e) {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });
        $('#bns-whoPage .button-add-app-bns').click(function () {
            $(this).parent().prev().show();
            $(this).hide()
        });

        $('#bns-whoPage .button-remove-sp-bns').click(function () {
            $(this).closest(".row-dynamic").hide();
            $('#bns-whoPage .button-add-app-bns').show();
            var ppobject = SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerAdditionalUsersbnsDiv_TopSpan'];
            var usersobject = ppobject.GetAllUserInfo();
            usersobject.forEach(function (index) {
                ppobject.DeleteProcessedUser(usersobject[index]);
            });
            //$('#peoplePickerAdditionalUsersbnsDiv_TopSpan span.ms-entity-resolved').text('');
        });

        $('#BreakingNews span[title="bns-whatPage"]').unbind('click');
        $('#BreakingNews span[title="bns-whatPage"]').bind('click', this.bnsSaveUser);
        $('#BreakingNews span[title="bns-whatPage"]').css('cursor', 'pointer');
        $('#BreakingNews span[title="bns-wherePage"]').css('cursor', '');
        $('#BreakingNews span[title="bns-wherePage"]').unbind('click');
        $('#BreakingNews span[title="bns-whenPage"]').css('cursor', '');
        $('#BreakingNews span[title="bns-whenPage"]').unbind('click');

    }

}

NBCU.CrewRequest.BreakingNews.Who.prototype.PostBack = false;