NBCU.Fulfiller.Who = function () {
    var validCheck = true;
    var whoPageData = [];
    this.crewRequestData;

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

    this.EditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();

            $('#ff_Requester').prev('input').val($('#ff_Requester').text());
            $('#ff_MobilePhone').prev('input').val($('#ff_MobilePhone').text());
            $('#ff_DeskPhone').prev('input').val($('#ff_DeskPhone').text());
            $('#ff_Producer').prev('input').val($('#ff_Producer').text());
            $('#ff_PMobilePhone').prev('input').val($('#ff_PMobilePhone').text());
            $('#ff_PDeskPhone').prev('input').val($('#ff_PDeskPhone').text());
            $('#ff_Approver').prev('input').val($('#ff_Approver').text());
        }
        else {
            if (!$('.sp-peoplepicker-errorMsg').is(':visible')) {
                $(this).text("edit");
                $(this).parent().parent().find('.display-data').each(function (ind, val) {
                    $(this).show()
                    $(this).text($(this).prev().val());
                    $(this).prev().hide();
                });
                $('#ff_Requester').text($('#ff_peoplePickerRequesterDiv_TopSpan span.ms-entity-resolved').text());
                $('#ff_Producer').text($('#ff_peoplePickerProducerDiv_TopSpan span.ms-entity-resolved').text());
                $('#ff_Approver').text($('#ff_peoplePickerApproverDiv_TopSpan span.ms-entity-resolved').text());
            }
        }
        event.stopPropagation();
    }

    function getUserPropertiesRequestor(targetUser) {
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
            clientContext.executeQueryAsync(onRequestSuccessreq1, onRequestFailreq1);
        });
    }

    function onRequestSuccessreq1() {
        var phoneNo = personProperties.get_userProfileProperties()['CellPhone'];
        var deskNo = personProperties.get_userProfileProperties()['WorkPhone'];
        //var email = personProperties.get_userProfileProperties()['WorkEmail'];

        $('#ff_txtMobile').val(phoneNo);
        $('#ff_MobilePhone').text(phoneNo);
        $('#ff_txtDesk').val(deskNo);
        $('#ff_DeskPhone').text(deskNo);

        var peoplePickerId = 'ff_peoplePickerRequesterDiv';
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

    function onRequestFailreq1(sender, args) {
        console.log('fail');
    }

    function getUserPropertiesProducer(targetUser) {
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
            clientContext.executeQueryAsync(onRequestSuccessprod1, onRequestFailprod1);
        });
    }

    function onRequestSuccessprod1() {
        var phoneNo = personProperties.get_userProfileProperties()['CellPhone'];
        var deskNo = personProperties.get_userProfileProperties()['WorkPhone'];
        //var email = personProperties.get_userProfileProperties()['WorkEmail'];

        $('#ff_txtPMobile').val(phoneNo);
        $('#ff_PMobilePhone').text(phoneNo);
        $('#ff_txtPDesk').val(deskNo);
        $('#ff_PDeskPhone').text(deskNo);

        var peoplePickerId = 'ff_peoplePickerProducerDiv';
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

    function onRequestFailprod1(sender, args) {
        console.log('fail');
    }

    /* ------------- Init ------------------------ */

    this.Init = function () {
        $(".button-edit").off("click");
        $("#whoPage .button-edit").off("click");
        $("#whatPage .button-edit").off("click");
        $("#wherePage .button-edit").off("click");
        $("#whenPage .button-edit").off("click");
        $("#resourcesPage .button-edit-rs").off("click");
        crewRequestData = this.crewRequestData;
        var producerDetail = $('#ff_Producer').text();
        initializePeoplePickerControl('ff_peoplePickerRequesterDiv', $('#ff_Requester').text());
        SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerRequesterDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                resourceId = 0;
                ExecuteOrDelayUntilScriptLoaded(getUserPropertiesRequestor(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#ff_txtMobile').val("");
                $('#ff_MobilePhone').text("");
                $('#ff_txtDesk').val("");
                $('#ff_DeskPhone').text("");
            }
        };
        if (producerDetail !== "") {
            initializePeoplePickerControl('ff_peoplePickerProducerDiv', $('#ff_Producer').text());
        }
        SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerProducerDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                resourceId = 0;
                ExecuteOrDelayUntilScriptLoaded(getUserPropertiesProducer(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#ff_txtPMobile').val("");
                $('#ff_PMobilePhone').text("");
                $('#ff_txtPDesk').val("");
                $('#ff_PDeskPhone').text("");
            }
        };
        initializePeoplePickerControl('ff_peoplePickerApproverDiv', $('#ff_Approver').text());

        $('#whoPage .button-edit').bind('click', this.EditItems);
    }
}

NBCU.Fulfiller.Who.prototype.PostBack = false;