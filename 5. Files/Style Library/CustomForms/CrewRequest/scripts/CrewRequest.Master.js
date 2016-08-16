NBCU.CrewRequest.Master = function () {
    var talentData = [];
    var productionTypeData = [];
    var storyData = [];
    var showUnitData = [];
    var audioNeedData = [];
    var talentTypeData = [];
    var specialConditionData = [];

    this.requestPage = {
        whoPage: "Who",
        whatPage: "What",
        wherePage: "Where",
        whenPage: "When",
        resourcesPage: "Resources",
        BNSwhoPage: "bns-whoPage",
        BNSwhatPage: "bns-whatPage",
        BNSwherePage: "bns-wherePage",
        BNSwhenPage: "bns-whenPage",
        CLSwhoPage: "CLSwhoPage",
        CLSwhatPage: "CLSwhatPage",
        CLSwherePage: "CLSwherePage",
        CLSwhenPage: "CLSwhenPage",
        BureauCamera: "BureauCamera"
    };

    function getWebUserData() {
        SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function () {
            context = new SP.ClientContext.get_current();
            web = context.get_web();
            currentUser = web.get_currentUser();
            currentUser.retrieve();
            peopleManager = new SP.UserProfiles.PeopleManager(context);
            personProperties = peopleManager.getMyProperties();
            context.load(web);
            context.load(personProperties);
            context.executeQueryAsync(Function.createDelegate(this, this.onSuccessMethod), Function.createDelegate(this, this.onFailureMethod));
        });
    }
    this.onSuccessMethod = function (sender, args) {
        var userObject = web.get_currentUser();
        var cell = personProperties.get_userProfileProperties()['CellPhone'];
        var desk = personProperties.get_userProfileProperties()['WorkPhone'];
        //NBCU.CrewRequest.Helper.requestorKey = personProperties.get_userProfileProperties()['WorkEmail'];
        NBCU.CrewRequest.Helper.requestorKey = userObject.get_loginName();
        $('#requestermobile, #BNrequestermobile, #BCrequestermobile, #CLSrequestermobile').text(cell);
        $('#requestermobile, #BNrequestermobile, #BCrequestermobile, #CLSrequestermobile').prev().val(cell);
        $('#requesterdesk, #BNrequesterdesk, #BCrequesterdesk, #CLSrequesterdesk').text(desk);
        $('#requesterdesk, #BNrequesterdesk, #BCrequesterdesk, #CLSrequesterdesk').prev().val(desk);
        $('#requester, #BNrequester, #BCrequester, #CLSrequester').text(userObject.get_title());
    }
    this.onFailureMethod = function (sender, args) {
        console.log('request failed ' + args.get_message() + '\n' + args.get_stackTrace());
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
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    }

    /** Redirect to the page as per user action **/
    this.redirectPage = function (page) {
        switch (page) {
            case requestPage.whoPage:
                NBCU.CrewRequest.Who.PostBack = false;
                who_page = new NBCU.CrewRequest.Who();
                who_page.Init();
                $("#whoPage").show();
                $("#whatPage").hide();
                $("#wherePage").hide();
                $("#whenPage").hide();
                $("#resourcesPage").hide();
                $('.navigation li').removeClass('active-inprogress').removeClass('active');
                $('.navigation li:eq(0)').addClass('active-inprogress');
                break;
            case requestPage.whatPage:
                NBCU.CrewRequest.What.PostBack = false;
                what_page = new NBCU.CrewRequest.What();
                what_page.talentData = talentData;
                what_page.productionTypeData = productionTypeData;
                what_page.storyData = storyData;
                what_page.showUnitData = showUnitData;
                what_page.Init();
                $("#whatPage").show();
                $("#whoPage").hide();
                $("#wherePage").hide();
                $("#whenPage").hide();
                $("#resourcesPage").hide();
                $('.navigation li').removeClass('active-inprogress').removeClass('active');
                $('.navigation li:eq(0)').addClass('active');
                $('.navigation li:eq(1)').addClass('active-inprogress');
                break;
            case requestPage.wherePage:
                NBCU.CrewRequest.Where.PostBack = false;
                Where_page = new NBCU.CrewRequest.Where();
                Where_page.Init();
                $("#wherePage").show();
                $("#whoPage").hide();
                $("#whatPage").hide();
                $("#whenPage").hide();
                $("#resourcesPage").hide();
                $('.navigation li').removeClass('active-inprogress').removeClass('active');
                $('.navigation li:eq(0)').addClass('active');
                $('.navigation li:eq(1)').addClass('active');
                $('.navigation li:eq(2)').addClass('active-inprogress');
                break;
            case requestPage.whenPage:
                NBCU.CrewRequest.When.PostBack = false;
                When_page = new NBCU.CrewRequest.When();
                When_page.audioNeedsData = audioNeedsData;
                When_page.specialConditionData = specialConditionData;
                When_page.Init();
                $("#whenPage").show();
                $("#whoPage").hide();
                $("#whatPage").hide();
                $("#wherePage").hide();
                $("#resourcesPage").hide();
                $('.navigation li').removeClass('active-inprogress').removeClass('active');
                $('.navigation li:eq(0)').addClass('active');
                $('.navigation li:eq(1)').addClass('active');
                $('.navigation li:eq(2)').addClass('active');
                $('.navigation li:eq(3)').addClass('active-inprogress');
                break;
            case requestPage.resourcesPage:
                NBCU.CrewRequest.Resources.PostBack = false;
                Resources_page = new NBCU.CrewRequest.Resources();
                Resources_page.talentData = talentData;
                Resources_page.talentTypeData = talentTypeData;
                Resources_page.productionTypeData = productionTypeData;
                Resources_page.audioNeedsData = audioNeedsData;
                Resources_page.specialConditionData = specialConditionData;
                Resources_page.Init();
                $("#resourcesPage").show();
                $("#whoPage").hide();
                $("#whatPage").hide();
                $("#wherePage").hide();
                $("#whenPage").hide();
                $('.navigation li').removeClass('active-inprogress').removeClass('active');
                $('.navigation li:eq(0)').addClass('active');
                $('.navigation li:eq(1)').addClass('active');
                $('.navigation li:eq(2)').addClass('active');
                $('.navigation li:eq(3)').addClass('active');
                $('.navigation li:eq(4)').addClass('active-inprogress');
                break;
            case requestPage.BNSwhoPage:
                NBCU.CrewRequest.BreakingNews.Who.PostBack = false;
                BNS_who_page = new NBCU.CrewRequest.BreakingNews.Who();
                BNS_who_page.Init();
                $('.page-section').hide();
                $('.bnsNav li').removeClass('active-inprogress').removeClass('active');
                $('.bnsNav li:eq(0)').addClass('active-inprogress');
                $('#bns-whoPage').show();
                $("#bns-whatPage").hide();
                $("#bns-wherePage").hide();
                $("#bns-whenPage").hide();

                break;
            case requestPage.BNSwhatPage:
                NBCU.CrewRequest.BreakingNews.What.PostBack = false;
                BNS_what_page = new NBCU.CrewRequest.BreakingNews.What();
                BNS_what_page.talentData = talentData;
                BNS_what_page.productionTypeData = productionTypeData;
                BNS_what_page.storyData = storyData;
                BNS_what_page.showUnitData = showUnitData;
                BNS_what_page.Init();
                $('.page-section').hide();
                $('.bnsNav li').removeClass('active-inprogress').removeClass('active');
                $('.bnsNav li:eq(0)').addClass('active');
                $('.bnsNav li:eq(1)').addClass('active-inprogress');
                $('#bns-whatPage').show();
                $('#bns-whoPage').hide();
                $('#bns-wherePage').hide();
                $('#bns-whenPage').hide();
                break;
            case requestPage.BNSwherePage:
                NBCU.CrewRequest.BreakingNews.Where.PostBack = false;
                BNS_Where_page = new NBCU.CrewRequest.BreakingNews.Where();
                BNS_Where_page.Init();
                $('.page-section').hide();
                $('.bnsNav li').removeClass('active-inprogress').removeClass('active');
                $('.bnsNav li:eq(0)').addClass('active');
                $('.bnsNav li:eq(1)').addClass('active');
                $('.bnsNav li:eq(2)').addClass('active-inprogress');
                $('#bns-wherePage').show();
                $('#bns-whatPage').hide();
                $('#bns-whoPage').hide();
                $('#bns-whenPage').hide();
                break;
            case requestPage.BNSwhenPage:
                NBCU.CrewRequest.BreakingNews.When.PostBack = false;
                BNS_When_page = new NBCU.CrewRequest.BreakingNews.When();
                BNS_When_page.Init();
                $('.page-section').hide();
                $('.bnsNav li').removeClass('active-inprogress').removeClass('active');
                $('.bnsNav li:eq(0)').addClass('active');
                $('.bnsNav li:eq(1)').addClass('active');
                $('.bnsNav li:eq(2)').addClass('active');
                $('.bnsNav li:eq(3)').addClass('active-inprogress');
                $('#bns-whenPage').show();
                $('#bns-whatPage').hide();
                $('#bns-whoPage').hide();
                $('#bns-wherePage').hide();
                break;
            case requestPage.CLSwhoPage:
                NBCU.CrewRequest.Correspondent.Who.PostBack = false;
                CLS_who_page = new NBCU.CrewRequest.Correspondent.Who();
                CLS_who_page.Init();
                $("#CLSwhoPage").show();
                $("#CLSwhatPage").hide();
                $("#CLSwherePage").hide();
                $("#CLSwhenPage").hide();
                $('.clsNav li').removeClass('active-inprogress').removeClass('active');
                $('.clsNav li:eq(0)').addClass('active-inprogress');
                break;
            case requestPage.CLSwhatPage:
                NBCU.CrewRequest.Correspondent.What.PostBack = false;
                CLS_what_page = new NBCU.CrewRequest.Correspondent.What();
                CLS_what_page.talentData = talentData;
                CLS_what_page.productionTypeData = productionTypeData;
                CLS_what_page.storyData = storyData;
                CLS_what_page.showUnitData = showUnitData;
                CLS_what_page.Init();
                $("#CLSwhatPage").show();
                $("#CLSwhoPage").hide();
                $("#CLSwherePage").hide();
                $("#CLSwhenPage").hide();
                $('.clsNav li').removeClass('active-inprogress').removeClass('active');
                $('.clsNav li:eq(0)').addClass('active');
                $('.clsNav li:eq(1)').addClass('active-inprogress');
                break;
            case requestPage.CLSwherePage:
                NBCU.CrewRequest.Correspondent.Where.PostBack = false;
                CLS_Where_page = new NBCU.CrewRequest.Correspondent.Where();
                CLS_Where_page.Init();
                $("#CLSwherePage").show();
                $("#CLSwhoPage").hide();
                $("#CLSwhatPage").hide();
                $("#CLSwhenPage").hide();
                $('.clsNav li').removeClass('active-inprogress').removeClass('active');
                $('.clsNav li:eq(0)').addClass('active');
                $('.clsNav li:eq(1)').addClass('active');
                $('.clsNav li:eq(2)').addClass('active-inprogress');
                break;
            case requestPage.CLSwhenPage:
                NBCU.CrewRequest.Correspondent.When.PostBack = false;
                CLS_When_page = new NBCU.CrewRequest.Correspondent.When();
                CLS_When_page.Init();
                $("#CLSwhoPage").hide();
                $("#CLSwhatPage").hide();
                $("#CLSwherePage").hide();
                $("#CLSwhenPage").show();
                $('.clsNav li').removeClass('active-inprogress').removeClass('active');
                $('.clsNav li:eq(0)').addClass('active');
                $('.clsNav li:eq(1)').addClass('active');
                $('.clsNav li:eq(2)').addClass('active');
                $('.clsNav li:eq(3)').addClass('active-inprogress');
                break;
            case requestPage.BureauCamera:
                NBCU.CrewRequest.BureauCamera.PostBack = false;
                BureauCamera_page = new NBCU.CrewRequest.BureauCamera();
                BureauCamera_page.storyData = storyData;
                BureauCamera_page.showUnitData = showUnitData;
                BureauCamera_page.Init();
                break;
            default:
                NBCU.CrewRequest.Who.PostBack = false;
                who_page = new NBCU.CrewRequest.Who();
                who_page.Init();
                $("#whoPage").show();
                $("#whatPage").hide();
                $("#wherePage").hide();
                $("#whenPage").hide();
                $("#resourcesPage").hide();
                break;
        }
    };
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    };

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
        alert('fail');
    }

    function storyAPIcall() {
        $.ajax({
            url: "http://test-samurai.acquiremedia.com/Search/?format=brief&wireInclude=NC&maxReturn=25&query=penn*&scope=all&status=all",
            data: "{}",
            type: "GET",
            async: false,
            contentType: "application/javascript",
            dataType: "json",
            error: function (data) {
                console.log("Story API Failed")
            },
            success: function (data) {
                $.each(data.headlines, function (ind, val) {
                    storyData.push({
                        label: val.headline,
                        value: val.headline
                    });
                });
                $("#txtStoryName, #txtStoryName-bns, #txtStoryName-bc").autocomplete({
                    //source: finalStoryData,
                    source: storyData,
                    width: 300,
                    max: 20,
                    delay: 100,
                    minLength: 1,
                    autoFocus: true,
                    cacheLength: 1,
                    scroll: true,
                    highlight: false,
                    select: function (event, ui) {
                        //$('#txtStoryName').val(ui.item.Story);
                        $(event.target).val(ui.item.Story)
                    }
                });
            }
        });
    }


    /* ------------- Init ------------------------ */
    this.init = function () {
        $('.sidebar').on("click", '.navigation li.active', function () {
            redirectPage($(this).children().first().attr('action').trim());
        });

        ExecuteOrDelayUntilScriptLoaded(getWebUserData, "sp.js");
        var crewRequestPage = '';
        var home = getUrlVars()["home"];
        productionTypeData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "ProductionType", "?select=ID,ProductionType,ProductionTypePointValue");
        storyData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "Story", "?select=Story");
        showUnitData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "ShowUnit", "?select=ShowUnitTitle,DefaultBudgetCode,ID");
        talentData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "Talent", "?select=Title,TalentFirstName,TalentLastName,TalentTypeID,ID");
        audioNeedsData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "AudioNeed", "?select=AudioNeed,AudioNeedPointValue,ID");
        talentTypeData = NBCU.CrewRequest.Helper.ReadList("", "TalentType", "?select=TalentType,TalentTypePointValue");
        specialConditionData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "SpecialCondition", "?select=SpecialCondition,SpecialConditionPointValue,ID");
        //storyAPIcall();
        if (home == "1") {
            $('#welcomeScreen').hide();
            $('.content-container').show();
        }
        else {
            var windowsize = $(window).width();
            if (windowsize > 0) {
                $('body').addClass('overflow');
                $('#welcomeScreen').show();
                $('.model-form-container span.label').click(function () {
                    $('.valid-msg-error').hide();
                    $('.wrapper').hide();
                    $('.content-container').addClass('active-mobile');
                    $('.nav-button').addClass('active-mobile');
                    if ($(this).text() == "General Crew Request") {

                        $('#GeneralCrewRequest').show();
                        $('#BreakingNews').hide();
                        $('#CorrespondentLiveShot').hide();
                        $('#BureauCamera').hide();
                        $('.display-data1').text($('.display-data1:eq(0)').text());
                        redirectPage("Who");
                    }
                    else if ($(this).text() == "Breaking News") {
                        $('#BreakingNews').show();
                        $('#GeneralCrewRequest').hide();
                        $('#CorrespondentLiveShot').hide();
                        $('#BureauCamera').hide();
                        $('.display-data1-login').text($('.display-data1:eq(0)').text());
                        redirectPage("bns-whoPage");
                    }
                    else if ($(this).text() == "Bureau Camera") {
                        $('#BureauCamera').show();
                        $('#BreakingNews').hide();
                        $('#GeneralCrewRequest').hide();
                        $('#CorrespondentLiveShot').hide();
                        $('.display-data1-bc').text($('.display-data1:eq(0)').text());
                        redirectPage("BureauCamera");
                    }
                    else if ($(this).text() == "Correspondent Live Shot") {
                        $('#CorrespondentLiveShot').show();
                        $('#BureauCamera').hide();
                        $('#BreakingNews').hide();
                        $('#GeneralCrewRequest').hide();
                        redirectPage("CLSwhoPage");
                        $('.display-data1-login').text($('.display-data1:eq(0)').text());
                    }
                    $('body').removeClass('overflow');
                    $('#welcomeScreen').hide();
                });
            }
            //    if (windowsize < 767) {
            //        $('.model-form-container span.label').click(function () {
            //            $('.content-container').show();
            //            $('body').removeClass('overflow');
            //            $('#welcomeScreen').hide();
            //        });
            //    }
        }

        $('.button-welcome').click(function () {
            $('#welcomeScreen').show();
            $('.content-container').removeClass('active-mobile');
            $('.nav-button').removeClass('active-mobile');
        });

        $("span[title='Back']").click(function () {
            redirectPage($(this).attr('back').trim());
        });

        $("span[title='Next']").click(function () {
            redirectPage($(this).attr('next').trim());
        });

        $(document).on("click", ".icon-close", function () {
            $(this).parent().remove();
        });

        var dummayArr = [];
        $("#txtStoryName").autocomplete({
            //source: finalStoryData,
            source: dummayArr,
            width: 300,
            max: 20,
            delay: 100,
            minLength: 1,
            autoFocus: true,
            cacheLength: 1,
            scroll: true,
            highlight: false,
            select: function (event, ui) {
                //$('#txtStoryName').val(ui.item.Story);
                $(event.target).val(ui.item.Story)
            },
            search: function (event, ui) {
                $.ajax({
                    url: "http://test-samurai.acquiremedia.com/Search/?format=brief&wireInclude=NC&maxReturn=25&query=" + event.target.value + "*&scope=all&status=all",
                    data: "{}",
                    type: "GET",
                    async: false,
                    contentType: "application/javascript",
                    dataType: "json",
                    error: function (data) {
                        console.log("Story API Failed");
                    },
                    success: function (data) {
                        console.log("Story API success");
                        var storyData = [];
                        $.each(data.headlines, function (ind, val) {
                            storyData.push({
                                label: val.headline,
                                value: val.headline
                            });
                        });
                        $("#txtStoryName").autocomplete("option", { source: storyData });
                    }
                });
            }
        });
        $("#txtStoryName-bns").autocomplete({
            //source: finalStoryData,
            source: dummayArr,
            width: 300,
            max: 20,
            delay: 100,
            minLength: 1,
            autoFocus: true,
            cacheLength: 1,
            scroll: true,
            highlight: false,
            select: function (event, ui) {
                //$('#txtStoryName').val(ui.item.Story);
                $(event.target).val(ui.item.Story)
            },
            search: function (event, ui) {
                $.ajax({
                    url: "http://test-samurai.acquiremedia.com/Search/?format=brief&wireInclude=NC&maxReturn=25&query=" + event.target.value + "*&scope=all&status=all",
                    data: "{}",
                    type: "GET",
                    async: false,
                    contentType: "application/javascript",
                    dataType: "json",
                    error: function (data) {
                        console.log("Story API Failed");
                    },
                    success: function (data) {
                        console.log("Story API success");
                        var storyData = [];
                        $.each(data.headlines, function (ind, val) {
                            storyData.push({
                                label: val.headline,
                                value: val.headline
                            });
                        });
                        $('#txtStoryName-bns').autocomplete("option", { source: storyData });
                    }
                });
            }
        });
        $("#txtStoryName-bc").autocomplete({
            //source: finalStoryData,
            source: dummayArr,
            width: 300,
            max: 20,
            delay: 100,
            minLength: 1,
            autoFocus: true,
            cacheLength: 1,
            scroll: true,
            highlight: false,
            select: function (event, ui) {
                //$('#txtStoryName').val(ui.item.Story);
                $(event.target).val(ui.item.Story)
            },
            search: function (event, ui) {
                $.ajax({
                    url: "http://test-samurai.acquiremedia.com/Search/?format=brief&wireInclude=NC&maxReturn=25&query=" + event.target.value + "*&scope=all&status=all",
                    data: "{}",
                    type: "GET",
                    async: false,
                    contentType: "application/javascript",
                    dataType: "json",
                    error: function (data) {
                        console.log("Story API Failed");
                    },
                    success: function (data) {
                        console.log("Story API success");
                        var storyData = [];
                        $.each(data.headlines, function (ind, val) {
                            storyData.push({
                                label: val.headline,
                                value: val.headline
                            });
                        });
                        $('#txtStoryName-bc').autocomplete("option", { source: storyData });
                    }
                });
            }
        });

        $(document).on("change", ".descShoot, .meetShoot", function () {
            alert('test');
        });

        //$(".navigation li.active").on("click", function () {
        //    redirectPage($(this).children().attr('action'));
        //});

        //$(document).on("click", ".navigation li.active", function () {
        //    redirectPage($(this).children().attr('action'));
        //});

        redirectPage(crewRequestPage);
        initializePeoplePicker('peoplePickerProducerDiv', false);
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
        /*SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerDiv_TopSpan.OnValueChangedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnValueChangedClientScript');
            if (selectedUsersInfo.length == 1) {
                ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#producermobile').text("");
                $('#producermobile').prev().val("");
                $('#producerdesk').text("");
                $('#producerdesk').prev().val("");
            }
            if (selectedUsersInfo.length > 1) {
                //get selected users and select the second user (index 1) to remove
                var userToRemoveKey = selectedUsersInfo[1].Key;

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
        };*/

        initializePeoplePicker('peoplePickerApproverDiv', false);
        initializePeoplePicker('peoplePickerAdditionRequestDiv', true);
        $('.sp-peoplepicker-userSpan').css('display', 'block')


        var today = new Date();
        var todayVal = today.toISOString().split('T')[0];
        var to_day = todayVal.split('-');
        $('.intialDate').text("[" + to_day[1] + "/" + to_day[2] + "]");

        $('#StartDate').dateRangePicker({
            inline: false,
            mode: 'single',
            container: '.calender-conatainer',
            alwaysOpen: true,
            singleMonth: true,
            stickyMonths: true,
            hoveringTooltip: function (days, startTime, hoveringTime) {
                $('#shootdays').val(days);
            },
            setValue: function (s, s1, s2) {
                var initDesc = $('.initialdesc').val();
                $('#shootdays').val(parseFloat(NBCU.CrewRequest.Helper.daydiff(NBCU.CrewRequest.Helper.parseDate(s1), NBCU.CrewRequest.Helper.parseDate(s2)) + 1));
                $('#StartDate').val(s1);
                $('#EndDate').val(s2);
                //var s1split = s1.split('-')[2];
                //var s2split = s2.split('-')[2];
                //$('.sdControl').empty();
                //var bodyContent = "";
                //var j = 1;
                //for (var i = parseInt(s1split) ; i <= parseInt(s2split) ; i++) {
                //    if (j <= 7) {
                //        if (i.toString().length == 1) {
                //            dateSelected = s1.split('-')[1] + "/" + "0" + i;
                //        }
                //        else {
                //            dateSelected = s1.split('-')[1] + "/" + i;
                //        }
                //        var dateresults = $.grep(NBCU.CrewRequest.Helper.shootDesc, function (a) {
                //            return a.date == "[" + dateSelected + "]";
                //        });
                //        if (dateresults.length == 0) {
                //            if (j == 1 && initDesc != undefined) {
                //                NBCU.CrewRequest.Helper.shootDesc.push({
                //                    date: '[' + dateSelected + ']',
                //                    MeetTime: "",
                //                    Desc: initDesc
                //                });
                //            }
                //            else {
                //                NBCU.CrewRequest.Helper.shootDesc.push({
                //                    date: '[' + dateSelected + ']',
                //                    MeetTime: "",
                //                    Desc: ""
                //                });
                //            }

                //        }
                //        if (parseInt(i) == parseInt(s1split)) {
                //            if (parseInt(s1split) == parseInt(s2split)) {
                //                bodyContent += '<div class="shoot-selected gcrShoot">' +
                //                                        '<div class="date-shoot" style="display:none;"><span class="shoot-label">[' + dateSelected + ']</span></div>' +
                //                                        '<input type="text"  class="shoot-textbox-multi shoot-textbox-01 descShoot"/>' +
                //                             '</div>';
                //            }
                //            else {
                //                bodyContent += '<div class="shoot-selected gcrShoot">' +
                //                                            '<div class="date-shoot"><span class="shoot-label">[' + dateSelected + ']</span></div>' +
                //                                            '<div class="description-shoot"><span class="shoot-label">Description:</span></div>' +
                //                                            '<input type="text" class="shoot-textbox shoot-textbox-01 descShoot"/>' +
                //                                 '</div>';
                //            }
                //        }
                //        else {
                //            bodyContent += '<div class="selectbox-full-large">' +
                //                                '<span class="icon-close"></span>' +
                //                                '<div class="shoot-selected gcrShoot">' +
                //                                    '<div class="date-shoot"><span class="shoot-label intialDate">[' + dateSelected + ']</span></div>' +
                //                                    '<div class="description-shoot"><span class="shoot-label">Meet Time/Location:</span>' +
                //                                      '<input type="text" class="shoot-textbox meetShoot" />' +
                //                                    '</div>' +
                //                                    '<div class="description-shoot"><span class="shoot-label">Description:</span>' +
                //                                    '<textarea class="shoot-textbox-multi descShoot" /></textarea>' +
                //                                    '</div>' +
                //                                '</div>' +
                //                            '</div>';
                //        }
                //        j++;
                //    }
                //    $('.gcrSDControl').html(bodyContent);
                //}

                //$.each($('.date-shoot'), function (ind, val) {
                //    var seldate = $(this).text();
                //    var resVal = $.grep(NBCU.CrewRequest.Helper.shootDesc, function (a) {
                //        return a.date == seldate;
                //    });
                //    if (resVal.length == 1) {
                //        $(this).parent().find('.descShoot').val(resVal[0].Desc);
                //        $(this).parent().find('.meetShoot').val(resVal[0].MeetTime);
                //    }
                //});

                //$(document).off("change", ".descShoot, .meetShoot");
                //$(document).on("change", ".descShoot, .meetShoot", function () {
                //    var selDate = $(this).closest('.gcrShoot').children().first().text();
                //    var results = $.grep(NBCU.CrewRequest.Helper.shootDesc, function (a) {
                //        return a.date == selDate;
                //    });
                //    if (results.length == 1) {
                //        if ($(this).attr('class').indexOf('descShoot') != -1) {
                //            results[0].Desc = $(this).val()
                //        }
                //        else {
                //            results[0].MeetTime = $(this).val()
                //        }
                //    }
                //});
            }
        });

    }

    return {
        Init: init,
        redirectPage: this.redirectPage
    }

}();
$(document).ready(NBCU.CrewRequest.Master.Init);