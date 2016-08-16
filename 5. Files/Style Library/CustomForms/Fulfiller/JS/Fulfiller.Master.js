var resourceId = 0;

NBCU.Fulfiller.Master = function () {
    var validCheck = true;
    var staticCrewRequestID = 331;
    var crewRequestData = [];
    var crt_TalentData = [];
    var crt_ShowUnitData = [];
    var crt_ShootData = [];
    var crt_ResourceData = [];
    var talentData = [];
    var productionTypeData = [];
    var talentTypeData = [];
    var storyData = [];
    var showUnitData = [];
    var stateData = [];
    var countryData = [];
    var audioNeedsData = [];
    var transmissionTypeData = [];
    var specialConditionData = [];
    var revisionNotes = [];
    var allShowUnit = '';
    var valideditsection = false;
    var txtEmailID = '';
    var resourceKey = '';

    this.editPage = {
        whoPage: "Who",
        whatPage: "What",
        wherePage: "Where",
        whenPage: "When",
        resourcesPage: "Resources"
    };

    function nullckeck(value) {
        var returnVal = "";
        if (!!value) {
            returnVal = value;
        }
        return returnVal;
    }

    /** Fill data on load **/
    this.FillData = function () {
        resourceKey = nullckeck(crewRequestData.resourcesKey);
        var startDate = NBCU.Fulfiller.Helper.dateParse(crewRequestData.StartDate1);
        var endDate = NBCU.Fulfiller.Helper.dateParse(crewRequestData.EndDate1)
        crewRequestData.CCEmail = crewRequestData.CCEmail == null ? "" : crewRequestData.CCEmail;
        $('#ff-header-startdate').text(startDate);
        $('#ff-header-slug').text(crewRequestData.AssignmentSlug == null ? "" : crewRequestData.AssignmentSlug);
        $('#ff-header-shootstatus').text(crewRequestData.ShootStatus == null ? "" : crewRequestData.ShootStatus);
        $('.book-id').text(crewRequestData.CrewRequestID == null ? "" : crewRequestData.CrewRequestID);
        $('#ff_Requester').text(crewRequestData.Requester);
        $('#ff_MobilePhone').text(crewRequestData.CellPhone1);
        $('#ff_MobilePhone').prev('input').val(crewRequestData.CellPhone1);
        $('#ff_DeskPhone').text(crewRequestData.DeskNumber == null ? "" : crewRequestData.DeskNumber);
        $('#ff_DeskPhone').prev('input').val(crewRequestData.DeskNumber == null ? "" : crewRequestData.DeskNumber);
        var producerDetail = crewRequestData.Producer == null ? "" : crewRequestData.Producer
        $('#ff_Producer').text(producerDetail);
        $('#ff_PMobilePhone').text(crewRequestData.ProducerCellNumber);
        $('#ff_PMobilePhone').prev('input').val(crewRequestData.ProducerCellNumber);
        $('#ff_PDeskPhone').text(crewRequestData.ProducerDeskNumber == null ? "" : crewRequestData.ProducerDeskNumber);
        $('#ff_PDeskPhone').prev('input').val(crewRequestData.ProducerDeskNumber == null ? "" : crewRequestData.ProducerDeskNumber);
        $('#ff_Approver').text(crewRequestData.Approver == null ? "" : crewRequestData.Approver);
        $('#ff_ShootStatus').text(crewRequestData.ShootStatus == null ? "" : crewRequestData.ShootStatus);
        $('#ff_shootstatus').val(crewRequestData.ShootStatus == null ? "" : crewRequestData.ShootStatus);
        initializePeoplePickerControl('ff_peoplePickerRequesterDiv', $('#ff_Requester').text());

        if (producerDetail !== "") {
            initializePeoplePickerControl('ff_peoplePickerProducerDiv', $('#ff_Producer').text());
        }

        initializePeoplePickerControl('ff_peoplePickerApproverDiv', $('#ff_Approver').text());

        $('#ff_ProductionType').text(crewRequestData.ProductionType == null ? "" : crewRequestData.ProductionType);
        $('#ff_StoryName').text(crewRequestData.StoryName == null ? "" : crewRequestData.StoryName);
        $('#ff_StoryName').prev('input').val(crewRequestData.StoryName == null ? "" : crewRequestData.StoryName);
        $('#ff_AssignmentSlug').text(crewRequestData.AssignmentSlug == null ? "" : crewRequestData.AssignmentSlug);
        $('#ff_AssignmentSlug').prev('input').val(crewRequestData.AssignmentSlug == null ? "" : crewRequestData.AssignmentSlug);
        $('#ff_ShootStatus').text(crewRequestData.ShootStatus == null ? "" : crewRequestData.ShootStatus);
        $('#ff_shootstatus').val(crewRequestData.ShootStatus == null ? "" : crewRequestData.ShootStatus);
        $('#ff_EditRequestId').text(crewRequestData.AttachEditRequestID == null ? "" : crewRequestData.AttachEditRequestID);
        $('#ff_EditRequestId').prev('input').val(crewRequestData.AttachEditRequestID == null ? "" : crewRequestData.AttachEditRequestID);

        $('#ff_Address').text(crewRequestData.CrewAddress === null ? '' : crewRequestData.CrewAddress);
        $('#ff_Address').prev('input').val(crewRequestData.CrewAddress === null ? '' : crewRequestData.CrewAddress);
        $('#ff_City').text(crewRequestData.CrewCity === null ? '' : crewRequestData.CrewCity);
        $('#ff_City').prev('input').val(crewRequestData.CrewCity === null ? '' : crewRequestData.CrewCity);
        $('#ff_Zip').text(crewRequestData.Zip === null ? '' : crewRequestData.Zip);
        $('#ff_Zip').prev('input').val(crewRequestData.Zip === null ? '' : crewRequestData.Zip);
        $('#ff_Country').text(crewRequestData.Country === null ? '' : crewRequestData.Country);
        $('#ff_State').text(crewRequestData.CrewState === null ? '' : crewRequestData.CrewState);
        $('#ff_StartDate').text(startDate);
        $('#ff_StartDate').prev('input').val(startDate);
        $('#ff_EndDate').text(endDate);
        $('#ff_EndDate').prev('input').val(endDate);
        $('#ff_Days').text(crewRequestData.DaysShoot);
        $('#ff_Days').prev('input').val(crewRequestData.DaysShoot);
        $('#ff_TimeZone').text(crewRequestData.DayZone);
        $('#ff_TimeZone').prev('select').val(crewRequestData.DayZone);
        var meetTime = crewRequestData.MeetTime;
        meetTime = meetTime.replace(':', ' ');
        meetTime = meetTime.split(' ');
        var rollTime = crewRequestData.RollTime;
        rollTime = rollTime.replace(':', ' ');
        rollTime = rollTime.split(' ');
        var endTime = crewRequestData.EndTime;
        endTime = endTime.replace(':', ' ');
        endTime = endTime.split(' ');
        $('#ff_MeetTime').text(crewRequestData.MeetTime);
        $('#ff-meettime-hr').val(meetTime[0]);
        $('#ff-meettime-min').val(meetTime[1]);
        $('#ff-meettime-select').val(meetTime[2]);
        //$('#ff_MeetTime').prev('input').val(crewRequestData.MeetTime);
        $('#ff_RollTime').text(crewRequestData.RollTime);
        $('#ff-rolltime-hr').val(rollTime[0]);
        $('#ff-rolltime-min').val(rollTime[1]);
        $('#ff-rolltime-select').val(rollTime[2]);
        $('#ff_EndTime').text(crewRequestData.EndTime);
        $('#ff-endtime-hr').val(endTime[0]);
        $('#ff-endtime-min').val(endTime[1]);
        $('#ff-endtime-select').val(endTime[2]);
        $('#ff_AudioNeeds').text(crewRequestData.AudioNeed);
        $('#ff_SpecialConditions').text(crewRequestData.SpecialConditions);
        $('#ff_TransmissionType').text(crewRequestData.TransmissionType == null ? "" : crewRequestData.TransmissionType);
        $('#ff_audioneed-select').val(crewRequestData.AudioNeed);
        $('#ff_specialconditions-select').val(crewRequestData.SpecialConditions);
        $('#ff_transmissiontype-select').val(crewRequestData.TransmissionType == null ? "" : crewRequestData.TransmissionType);
        $('.descShoot').val(crewRequestData.ShootDescription == null ? "" : crewRequestData.ShootDescription);
        $('#ff_descShoot').text(crewRequestData.ShootDescription == null ? "" : crewRequestData.ShootDescription);
        var resourceReason = crewRequestData.ResourceReason == null ? "" : crewRequestData.ResourceReason;
        $('#ff_Camera').text(crewRequestData.Camera);
        $('#ff_camera-select').val(crewRequestData.Camera);
        $('#ff_Audio').text(crewRequestData.Audio);
        $('#ff_audio-select').val(crewRequestData.Audio);
        $('#ff_Utilities').text(crewRequestData.Utilities);
        $('#ff_utilities-select').val(crewRequestData.Utilities);
        $('#ff_EstimatedCost').text(nullckeck(crewRequestData.EstimatedCost));
        $('#ff_EstimatedCostsave').text(crewRequestData.EstimatedCost);

        $('#ff_productiontype').val(crewRequestData.ProductionType);
        var selectedResource = crewRequestData.SelectedResources;
        NBCU.Fulfiller.Helper.suggestedResource = crewRequestData.SuggestedResources;
        $('#ff_OverrideApproval').children('select').val((crewRequestData.OverrideApproval === 'NA' || crewRequestData.OverrideApproval === null)  ? 'Pending' : crewRequestData.OverrideApproval);
        if (parseInt(selectedResource) > parseInt(NBCU.Fulfiller.Helper.suggestedResource)) {
            $('#resourcesPage .form-override').show();
            //$('#ff_OverrideApproval').find('select').val('Yes')
            $('#ff_ResourceReason').text(resourceReason);
            $('#ff_ResourceReason').prev('select').val(resourceReason);
            $('#ff_ResourceDescription').text(crewRequestData.ResourceDescription == null ? "" : crewRequestData.ResourceDescription);
            $('#ff_ResourceDescription').prev('textarea').val(crewRequestData.ResourceDescription == null ? "" : crewRequestData.ResourceDescription);
        }
        else {
            $('#resourcesPage .form-override').hide();
            //$('#ff_OverrideApproval').find('select').val('No')
            $('#ff_ResourceReason').text('');
            $('#ff_ResourceReason').prev('select').val('');
            $('#ff_ResourceDescription').text('');
            $('#ff_ResourceDescription').prev('textarea').val('');
        }

        $('#ff_CameraType').val(crewRequestData.PrimaryCameraType);
        $('#ff_MediaFormat').val(crewRequestData.MediaFormat);
        $('#ff_VideoSpecs').val(crewRequestData.VideoSpecs);
        $('#ff_CrewDeskNotes').val(crewRequestData.CrewDeskNotes == null ? "" : crewRequestData.CrewDeskNotes);
        if (crewRequestData.RequestStatus != "" && crewRequestData.RequestStatus != null && crewRequestData.RequestStatus != "None") {
            $('#fulfiller .button-group-status').find('.active').removeClass('active');
            $('#fulfiller .button-group-status').find("a[title^='" + crewRequestData.RequestStatus + "']").addClass('active');
            $('#fulfiller #ff-header-status').text($('#fulfiller .button-group-status').find('.active').attr('title'))
            $('#fulfiller #ff-header-status').removeClass().addClass('button').addClass('button-' + $('#fulfiller .button-group-status').find('.active').attr('title').toLowerCase()).addClass('active');
        }
        var docArr = getCrewDoc(NBCU.Fulfiller.Helper.staticCrewRequestID);
        var dcoHTML = "";
        $.each(docArr, function (ind, val) {
            dcoHTML += '<a href="/MWFDocument/' + val.Name + '" class="attachment-file">' + val.Name + '</a>';
        });
        $('#ff_Attachment').html(dcoHTML);
        reloadRevision();

        if (crewRequestData.CCEmail != "") {
            initializePeoplePickerControl('ff_peoplePickerCCEmailDiv', crewRequestData.CCEmail);
        }
        $('#ff_CrewDesk').val(crewRequestData.CrewDeskFile != null ? crewRequestData.CrewDeskFile.split(",") : []);
        $('#ff_crewdesk').text(crewRequestData.CrewDeskFile != null ? crewRequestData.CrewDeskFile.split(", ") : '');
    }

    /** Revise comment update **/
    function reloadRevision() {
        if (revisionNotes.length > 0) {
            var data = "";
            var numContent = "";
            var num = 0;
            $.each(revisionNotes, function (ind, val) {
                var comments = val.RevisedComments == null ? "" : val.RevisedComments;
                if (val.RevisedNumber != "Revised") {
                    numContent = "-";
                }
                else {
                    num++;
                    numContent = num.toString();
                }
                data += '<div class="trow">' +
                               '<div class="td cols-1">' + numContent + '</div>' +
                               '<div class="td cols-2">' + val.RevisedBy + '</div>' +
                               '<div class="td cols-8">' + comments + '</div>' +
                               '<div class="td cols-2">' + val.RevicedDate + '</div>' +
                           '</div>';
            });

            $('.table-container .tbody').html(data);
        }
    }

    /** Get the URL params **/
    function getUrlVars() {
        var vars = [], hash;
        try {
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;

        } catch (e) {
            console.log(e.message);
        }
    }

    /** Get the upload doucment **/
    function getCrewDoc(CRid) {
        var returnArray = [];
        var crewType = crewRequestData.CrewType
        if (crewType === "General Crew Request") {
            crewType = "Crew Request";
        }
        crewType = crewType.replace(/\s/g, "%20");
        try {
            $.ajax({
                url: "/sites/bcast_prodreq/_vti_bin/listdata.svc/MWFDocument?$select=Id,AssociatedRequestID,Name,RequestType&$filter=AssociatedRequestID eq '" + CRid + "' and RequestType eq '" + crewType + "'",
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
            console.log(e.message);
        }
    }

    /** Append the history data **/
    function AppendHistoryControl(id) {
        var proID = new Array();
        var proTitle = new Array();
        var proModified = new Array();
        var proHistory = new Array();
        var i = 0;
        try {
            $().SPServices({
                operation: "GetListItems",
                //webURL: web,
                async: false,
                listName: "CrewRequest",
                CAMLQuery: '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">' + id + '</Value></Eq></Where></Query>',
                CAMLViewFields: '',
                completefunc: function (xdata, status) {
                    // alert(xdata.responseXML.xml);
                    $(xdata.responseXML).SPFilterNode("z:row").each(function () {
                        var xitem = $(this);
                        var ID = xitem.attr('ows_ID');
                        var Title = xitem.attr('ows_Title');
                        var Modified = xitem.attr('ows_Modified');
                        var History = xitem.attr('ows_History');

                        //alert(ID);
                        proID[i] = ID;
                        proTitle[i] = Title;
                        proModified[i] = Modified;
                        proHistory[i] = History;
                        i++;
                    });
                }
            });

        } catch (e) {
            console.log(e.message);
        }
        for (i = 0; i < proID.length; i++) {
            try {
                $().SPServices({
                    operation: "GetVersionCollection",
                    async: false,
                    //webURL: web,
                    strlistID: "CrewRequest",
                    CAMLQuery: "<Query><OrderBy><FieldRef Name='Modified' Ascending='false' /></OrderBy></Query>",
                    strlistItemID: proID[i].toString(),
                    strFieldName: "RevisionNotes",
                    completefunc: function (xdata, Status) {
                        var data = "";
                        $(xdata.responseText).find("Version").each(function () {
                            // alert(xdata.responseXML.xml);
                            var xitem = $(this);
                            var Name = xitem.attr('Editor');
                            var Title = xitem.attr('Title');
                            //var Modified = xitem.attr('Modified');
                            var Modified = xitem.attr('Modified').split("T")[0];
                            var ModifiedTime = xitem.attr('Modified').split("T")[1];
                            var History = xitem.attr('RevisionNotes');
                            var received = new Date(xitem.attr('Modified'));
                            var arr = Name.split('#');
                            data += '<div class="trow">' +
                                    '<div class="td cols-1"></div>' +
                                    '<div class="td cols-2">' + arr[arr.length - 1] + '</div>' +
                                    '<div class="td cols-8">' + History + '</div>' +
                                    '<div class="td cols-2">' + Modified + ' - ' + received.toLocaleTimeString() + '</div>' +
                                '</div>';
                        });
                        $('.table-container .tbody').html(data);
                    }
                });

            } catch (e) {
                console.log(e.message);
            }
        }
    }

    function addTalent(crt_TalentData) {
        if (crewRequestData.CrewType != "Bureau Camera") {
            $.each(crt_TalentData, function (index, new_obj) {
                NBCU.Fulfiller.Helper.cntTalent = index;
                var btn_click_cntl = '<div class="forms-add-conatiner">' +
                         '<label class="label label-display">Talent (On Site) </label>' +
                         '<div class="display-dataform">' +
                             '<input type="text" class="textbox" value="' + new_obj['Title'] + '" id="ff_txtTalent_' + index + '" ff_talentid_' + index + '="' + new_obj['TalentID'] + '">' +
                             '<span class="display-data" id="ff_Talent_' + index + '" ff_Talent_ID_' + index + '="' + new_obj['TalentID'] + '">' + new_obj['Title'] + '</span>' +
                             '<div class="valid-msg valid-msg-error">It is duplicated</div>' +
                         '</div>';
                if (index == 0) {
                    btn_click_cntl += '</div><div class="addbutton-container" id="ff_TalentAdd"> <span class="button-add1 button-addt">+ add talent</span> </div> ';
                    $('#ffTalentDiv').append(btn_click_cntl);
                }
                else {
                    btn_click_cntl += '<span class="remove-button button-remove-talent"></span></div>'
                    $('#ff_TalentAdd').before(btn_click_cntl);
                }
            });
        }
    }

    function addShowUnit(crt_ShowUnitData) {
        if (crt_ShowUnitData.length > 0) {
            $.each(crt_ShowUnitData, function (index, new_obj) {
                NBCU.Fulfiller.Helper.txtUnit = index;
                var btn_click_cntl = '<div class="colsshowunit"><div class="cols cols-6 form-group">' +
                             '<label class="label label-display">Show Unit </label>' +
                             '<div class="display-dataform">' +
                                 '<input type="text" class="textbox" value="' + new_obj['Title'] + '" id="ff_txtUnit_' + index + '" ff_txtunitid_' + index + '="' + new_obj['ShowUnitID'] + '">' +
                                 '<span class="display-data" id="ff_ShowUnit_' + index + '" ff_showunit_id_' + index + '="' + new_obj['ShowUnitID'] + '">' + new_obj['Title'] + '</span>' +
                                 '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                             '</div>' +
                         '</div>' +
                        '<div class="cols cols-6 form-group">' +
                            '<label class="label label-display">Budget Code </label>' +
                            '<div class="display-dataform">' +
                                '<input type="text" class="textbox" value="' + new_obj['AssignedBudgetCode'] + '" id="ff_txtBucode_' + index + '" >' +
                                '<span class="display-data" id="ff_BudgetCode_' + index + '">' + new_obj['AssignedBudgetCode'] + '</span>' +
                            '</div>';
                if (index != 0 || crewRequestData.CrewType != "General Crew Request") {
                    btn_click_cntl += '<span class="remove-button button-remove-showunit"></span></div></div>'
                }
                else {
                    btn_click_cntl += '</div></div>';
                }

                if (index == 0) {
                    allShowUnit = new_obj['Title'];

                    btn_click_cntl += '<div class="addbutton-container" id="ff_ShowUnitAdd"> <span class="button-add1 button-addsu">+ add show unit</span> </div> ';
                    $('#ffShowUnitDiv').append(btn_click_cntl);
                }
                else {
                    $('#ff_ShowUnitAdd').before(btn_click_cntl);
                }
            });
        }
        else {
            var btn_click_cntl = '<div class="addbutton-container" id="ff_ShowUnitAdd"> <span class="button-add1 button-addsu">+ add show unit</span> </div> ';
            $('#ffShowUnitDiv').append(btn_click_cntl);
        }
    }

    function addShootDesc(crt_ShootData) {
        var bodyContent = '';
        $.each(crt_ShootData, function (index, new_obj) {
            var shootTitle = new_obj['Title'] == null ? "" : new_obj['Title'];
            var shootDesc = new_obj['ShootDescription'] == null ? "" : new_obj['ShootDescription'];
            var shootMeet = new_obj['MeetTime'] == null ? "" : new_obj['MeetTime'];
            if (index == 0) {
                bodyContent += '<div class="shoot-selected">' +
                                        '<div class="date-shoot"><span class="shoot-label">' + shootTitle + '</span></div>' +
                                        '<div class="description-shoot"><span class="shoot-label">Description:</span></div>' +
                                        '<input type="text" class="shoot-textbox shoot-textbox-01 descShoot" value="' + shootDesc + '"/>' +
                                '</div>';
            }
            else {
                bodyContent += '<div class="selectbox-full-large">' +
                                    '<span class="icon-close"></span>' +
                                    '<div class="shoot-selected">' +
                                        '<div class="date-shoot"><span class="shoot-label intialDate">' + shootTitle + '</span></div>' +
                                        '<div class="description-shoot"><span class="shoot-label">Meet Time/Location:</span>' +
                                          '<input type="text" class="shoot-textbox meetShoot" value="' + shootMeet + '" />' +
                                        '</div>' +
                                        '<div class="description-shoot"><span class="shoot-label">Description:</span>' +
                                        '<textarea  class="shoot-textbox-multi descShoot"> ' + shootDesc + '</textarea>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
            }
        });
        $('.sdControl').html(bodyContent);
    }

    function addResource(crt_ResourceData) {
        if (crt_ResourceData.length > 0) {
            $.each(crt_ResourceData, function (index, new_obj) {
                var resultSet = '';
                NBCU.Fulfiller.Helper.cntResource = index;
                if (index == 0) {
                    initializePeoplePickerControl('ff_peoplePickerResourceDiv_0', new_obj['Resource']);
                    var chnageEvent = 'SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerResourceDiv_' + index + '_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {' +
                        //'alert("test")' +
                        'var currId= peoplePickerId.split("_")[2];' +
                        'if (selectedUsersInfo.length == 1) {' +
                            'resourceId = currId;' +
                            'ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");' +
                        '}' +
                        'else {' +
                                    '$("#ff_resource_phone_"+currId).val("");' +
                                    '$("#ff_resourcephone_"+currId).text("");' +
                                    '$("#ff_resource_email_"+currId).val("");' +
                                    '$("#ff_resourcemail_"+currId).text("");' +
                        '}' +
                    '};';
                    eval(chnageEvent);
                    $("#ff_resource_email_0").val(new_obj['ResourceEmail'] === null ? "" : new_obj['ResourceEmail']);
                    $("#ff_resource_role_0").val(new_obj['ResourceRole'] === null ? "" : new_obj['ResourceRole']);
                    $("#ff_resource_employeetype_0").val(new_obj['ResourceEmployeeType'] === null ? "" : new_obj['ResourceEmployeeType']);
                    $("#ff_resource_phone_0").val(new_obj['ResourcePhone'] === null ? "" : new_obj['ResourcePhone']);
                    $("#ff_resource_0").text(new_obj['Resource']);
                    $("#ff_resourcemail_0").text(new_obj['ResourceEmail'] === null ? "" : new_obj['ResourceEmail']);
                    $("#ff_resourcerole_0").text(new_obj['ResourceRole'] === null ? "" : new_obj['ResourceRole']);
                    $("#ff_resourcetype_0").text(new_obj['ResourceEmployeeType'] === null ? "" : new_obj['ResourceEmployeeType']);
                    $("#ff_resourcephone_0").text(new_obj['ResourcePhone'] === null ? "" : new_obj['ResourcePhone']);
                }
                else {
                    $('.button-add-app').parent().parent().addClass('active');
                    var resource_Role = new_obj['ResourceRole'] === null ? "" : new_obj['ResourceRole'];
                    var resource_Type = new_obj['ResourceEmployeeType'] === null ? "" : new_obj['ResourceEmployeeType'];
                    var resource_Phone = new_obj['ResourcePhone'] === null ? "" : new_obj['ResourcePhone'];
                    var resource_Email = new_obj['ResourceEmail'] === null ? "" : new_obj['ResourceEmail'];
                    var resultSet = '<section class="crew-info-container">' +
                      '<div class="row">' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Resource</label>' +
                          '<div class="display-data1">' +
                            '<div id="ff_peoplePickerResourceDiv_' + index + '" class="textbox crewinfopeoplepicker"></div>' +
                            '<span class="display-data" id="ff_resource_' + index + '">' + new_obj['Resource'] + ' </span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Phone #</label>' +
                          '<div class="display-data1">' +
                            '<input type="text" class="selectbox ProducerField" id="ff_resource_phone_' + index + '" value="' + resource_Phone + '"  maxlength="21" placeholder="(XXX) XXX-XXXX">' +
                            '<span class="display-data" id="ff_resourcephone_' + index + '">' + resource_Phone + '</span>' +
                          '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Email</label>' +
                          '<div class="display-data1">' +
                            '<input type="text" class="selectbox ProducerField" id="ff_resource_email_' + index + '" value="' + resource_Email + '">' +
                            '<span class="display-data" id="ff_resourcemail_' + index + '">' + resource_Email + '</span>' +
                            '<div class="valid-msg valid-msg-error">Invalid Email Format.</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                      '<div class="row row-2">' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer label-addres" style="visibility:hidden"> Additional<br>' +
                            'Users <span class="icon-info">i</span></label>' +
                          '<div class="display-dataform display-dataform-mobile display-pf2" style="display:none">' +
                            '<input type="text" class="selectbox ProducerField">' +
                            '<span class="icon-search"></span> <span class="remove-button button-remove-sp"></span> </div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Role</label>' +
                          '<div class="display-data1">' +
                            '<select class="textbox"  id="ff_resource_role_' + index + '">' +
                                '<option></option>' +
	                            '<option>None</option>' +
	                            '<option>Audio</option>' +
	                            '<option>Camera</option>' +
	                            '<option>DJ</option>' +
	                            '<option>Engineer</option>' +
	                            '<option>Producer</option>' +
	                            '<option>Still photographer</option>' +
	                            '<option>Utility/Grip</option>' +
                           '</select>' +
                            '<span class="display-data" id="ff_resourcerole_' + index + '">' + resource_Role + '</span>' +
                          '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Employee Type</label>' +
                          '<div class="display-data1 Employee-Type">' +
                            '<select class="textbox"  id="ff_resource_employeetype_' + index + '">' +
								'<option></option>' +
                                '<option>None</option>' +
                                '<option>Freelancer</option>' +
                                '<option>Staff</option>' +
							'</select>' +
                            '<span class="display-data" id="ff_resourcetype_' + index + '">' + resource_Type + '</span>'
                    '</div>' +
              '</div>' +
              '</div>' +
              '<div class="row">' +
              '<div class="cols cols-4 form-group button-remove-container">' +
              '<label class="label label-display label-producer" style="visibility:hidden">Resource</label>' +
              '<div class="display-data1 ">' +
              '<span class="button-remove-app">remove</span>' +
               '</div>' +
               '</div>' +
               '</div>' +
              '</section>';

                    $('.button-add-app').parent().parent().parent().prev().after(resultSet);
                    $('#ff_resource_role_' + index).val(resource_Role);
                    $('#ff_resource_employeetype_' + index).val(resource_Type);
                    initializePeoplePicker("ff_peoplePickerResourceDiv_" + index, false);
                    initializePeoplePickerControl("ff_peoplePickerResourceDiv_" + index, new_obj['Resource']);
                    var chnageEvent = 'SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerResourceDiv_' + index + '_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {' +
                        //'alert("test")' +
                        'var currId= peoplePickerId.split("_")[2];' +
                        'if (selectedUsersInfo.length == 1) {' +
                            'resourceId = currId;' +
                            'ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");' +
                        '}' +
                        'else {' +
                                    '$("#ff_resource_phone_"+currId).val("");' +
                                    '$("#ff_resourcephone_"+currId).text("");' +
                                    '$("#ff_resource_email_"+currId).val("");' +
                                    '$("#ff_resourcemail_"+currId).text("");' +
                        '}' +
                    '};';
                    eval(chnageEvent);
                }
            });
            updateResourceName();
            $('.crew-info-container .row-2').hide();
        }
        else {
            $('.crew-info-container .row-2').show();
            $('.subpage-crewinfo .ProducerField').show();
            $('.subpage-crewinfo .textbox').show();
            $('.button-add-app').show();
            $('.subpage-crewinfo .display-data').hide();
            $('.subpage-crewinfo .button-edit').text('save');
            $('.subpage-crewinfo .button-edit').hide();
        }
    }
    function CrewCal() {
        var labour = (parseFloat($('#ff_camera-select').val()) + parseFloat($('#ff_audio-select').val()) + parseFloat($('#ff_utilities-select').val())) * 1000;
        var gear = parseFloat($('#ff_camera-select').val()) * 1200;
        var total = labour + gear;
        var totalrange = (total * 0.10) + total
        $('#ff_EstimatedCost').html('<span class="icon-dollar">$</span>' + total + ' - <span class="icon-dollar">$</span>' + totalrange);
    };
    this.EditResource = function (event) {
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
        $('#ff_EstimatedCost').show();
        var page = $(this).attr('title').trim();
        switch (page) {
            case editPage.resourcesPage:
                NBCU.Fulfiller.Resources.PostBack = false;
                Resources_page = new NBCU.Fulfiller.Resources();
                Resources_page.crewRequestData = crewRequestData;
                Resources_page.talentData = talentData;
                Resources_page.productionTypeData = productionTypeData;
                Resources_page.audioNeedsData = audioNeedsData;
                Resources_page.specialConditionData = specialConditionData;
                Resources_page.Init();
                break;
            default:
                break;
        }

        event.stopPropagation();
    };



    function returnKeyProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += crewRequestData.producerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal;
    }

    function returnKeySeniorProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerApproverDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += crewRequestData.SeniorProducerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal
    }

    function collectNewCrewData() {

        NBCU.Fulfiller.Helper.newCrewRequestData = {};
        NBCU.Fulfiller.Helper.newCrewRequestData.Title = $('#ff_Requester').text();
        var newResource = "";
        $.each($('.crew-info-container').children().find('.sp-peoplepicker-topLevel'), function (ind, val) {
            var retobj = eval("SPClientPeoplePicker.SPClientPeoplePickerDict." + $(this).attr('id') + ".GetAllUserInfo()")
            if (retobj.length != 0) {
                if (retobj[0].Key != undefined) {
                    newResource += retobj[0].Key + ";";
                }
            }
        });
        NBCU.Fulfiller.Helper.newCrewRequestData.resourcesKey = resourceKey + newResource;
        NBCU.Fulfiller.Helper.newCrewRequestData.Requester = $('#ff_Requester').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.CellPhone1 = $('#ff_MobilePhone').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.DeskNumber = $('#ff_DeskPhone').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.Producer = $('#ff_Producer').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.ProducerCellNumber = $('#ff_PMobilePhone').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.ProducerDeskNumber = $('#ff_PDeskPhone').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.ProductionType = $('#ff_ProductionType').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.StoryName = $('#ff_StoryName').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.AssignmentSlug = $('#ff_AssignmentSlug').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.ShootStatus = $('#ff_ShootStatus').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.AttachEditRequestID = $('#ff_EditRequestId').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.CrewAddress = $('#ff_Address').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.CrewCity = $('#ff_City').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.CrewState = $('#ff_State').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.Zip = $('#ff_Zip').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.Country = $('#ff_Country').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.StartDate1 = $('#ff_StartDate').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.EndDate1 = $('#ff_EndDate').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.DaysShoot = $('#ff_Days').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.DayZone = $('#ff_TimeZone').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.MeetTime = $('#ff_MeetTime').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.RollTime = $('#ff_RollTime').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.EndTime = $('#ff_EndTime').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.AudioNeed = $('#ff_AudioNeeds').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.SpecialConditions = $('#ff_SpecialConditions').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.TransmissionType = $('#ff_TransmissionType').text();

        NBCU.Fulfiller.Helper.newCrewRequestData.ShootDescription = $('#ff_descShoot').text();

        NBCU.Fulfiller.Helper.newCrewRequestData.Camera = $('#ff_Camera').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.Audio = $('#ff_Audio').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.Utilities = $('#ff_Utilities').text();
        NBCU.Fulfiller.Helper.newCrewRequestData.EstimatedCost = $('#ff_EstimatedCost').text();
        if (crewRequestData.CrewType != "Bureau Camera") {
            NBCU.Fulfiller.Helper.newCrewRequestData.Approver = $('#ff_Approver').text();
            NBCU.Fulfiller.Helper.newCrewRequestData.ResourceReason = $('#ff_ResourceReason').text();
            NBCU.Fulfiller.Helper.newCrewRequestData.ResourceDescription = $('#ff_ResourceDescription').text();
        }
        NBCU.Fulfiller.Helper.newCrewRequestData.PrimaryCameraType = $('#ff_CameraType').val();
        NBCU.Fulfiller.Helper.newCrewRequestData.MediaFormat = $('#ff_MediaFormat').val();
        NBCU.Fulfiller.Helper.newCrewRequestData.VideoSpecs = $('#ff_VideoSpecs').val();
        NBCU.Fulfiller.Helper.newCrewRequestData.CrewDeskNotes = $('#ff_CrewDeskNotes').val();
        NBCU.Fulfiller.Helper.newCrewRequestData.RequestStatus = $('#fulfiller .button-group-status').find('.active').attr('title');
        if (crewRequestData.CrewType == "General Crew Request") {
            var totalCnt = parseFloat($('#ff_camera-select').val()) + parseFloat($('#ff_audio-select').val()) + parseFloat($('#ff_utilities-select').val());
            NBCU.Fulfiller.Helper.newCrewRequestData.SelectedResources = totalCnt.toString();
            NBCU.Fulfiller.Helper.newCrewRequestData.SuggestedResources = NBCU.Fulfiller.Helper.suggestedResource.toString();
            NBCU.Fulfiller.Helper.newCrewRequestData.LabourCost = crewRequestData.LabourCost;
            NBCU.Fulfiller.Helper.newCrewRequestData.GearCost = crewRequestData.GearCost;
            NBCU.Fulfiller.Helper.newCrewRequestData.EstimatedCost = crewRequestData.EstimatedCost;
            if (parseFloat(totalCnt) > parseFloat(NBCU.Fulfiller.Helper.suggestedResource)) {
                NBCU.Fulfiller.Helper.newCrewRequestData.OverrideApproval = $('#ff_OverrideApproval').children('select').val();
                NBCU.Fulfiller.Helper.newCrewRequestData.ResourceReason = $('#ff_reason-select').val();
                NBCU.Fulfiller.Helper.newCrewRequestData.ResourceDescription = $('#ff_txtResourceDesc').val();
            }
            else {
                NBCU.Fulfiller.Helper.newCrewRequestData.OverrideApproval = '';
                NBCU.Fulfiller.Helper.newCrewRequestData.ResourceReason = '';
                NBCU.Fulfiller.Helper.newCrewRequestData.ResourceDescription = '';
            }
        }
        var additionalUser = '';
        if ($('#ff_peoplePickerCCEmailDiv_TopSpan span.ms-entity-resolved').length > 1) {
            $.each($('#ff_peoplePickerCCEmailDiv_TopSpan span.ms-entity-resolved'), function (ind, val) {
                if (ind == $('#ff_peoplePickerCCEmailDiv_TopSpan span.ms-entity-resolved').length - 1) {
                    additionalUser = additionalUser + $(val).text();
                }
                else {
                    additionalUser = additionalUser + $(val).text() + " | ";
                }
            });
        }
        else {
            additionalUser = $('#ff_peoplePickerCCEmailDiv_TopSpan span.ms-entity-resolved').text();
        }
        NBCU.Fulfiller.Helper.newCrewRequestData.CCEmail = additionalUser;
        NBCU.Fulfiller.Helper.newCrewRequestData.CrewDeskFile = $('#ff_CrewDesk').val() != null ? $('#ff_CrewDesk').val().join(",") : null;

        if (crewRequestData.CrewType == "General Crew Request") {
            var totcount = parseFloat($('#ff_Camera').val()) + parseFloat($('#ff_Audio').val()) + parseFloat($('#ff_Utilities').val());
        }
        
        NBCU.Fulfiller.Helper.newCrewRequestData.producerKey = returnKeyProducer();
        NBCU.Fulfiller.Helper.newCrewRequestData.SeniorProducerKey = returnKeySeniorProducer();
    }

    /** Validate the field and data **/
    function getValidate() {
        validCheck = true;
        if ($('#ff_Requester').text() == "" && $('#ff_Requester').prev().val() == "") {
            $('#ff_Requester').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_Requester').next().hide();
        }
        if ($('#ff_MobilePhone').text() == "" && $('#ff_MobilePhone').prev().val() == "") {
            $('#ff_MobilePhone').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_MobilePhone').next().hide();
        }
        if ($('#ff_Producer').text() == "" && $('#ff_Producer').prev().val() == "") {
            $('#ff_Producer').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_Producer').next().hide();
        }
        if ($('#ff_PMobilePhone').text() == "" && $('#ff_PMobilePhone').prev().val() == "") {
            $('#ff_PMobilePhone').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_PMobilePhone').next().hide();
        }
        if ($('#ff_AssignmentSlug').text() == "" && $('#ff_AssignmentSlug').prev().val() == "") {
            $('#ff_AssignmentSlug').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_AssignmentSlug').next().hide();
        }
        if (!!$('#ff_ProductionType').text().trim()) {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_ProductionType').next().hide();
        }
        else {
            $('#ff_ProductionType').next().show();
            validCheck = false;
        }
        if ($('#ff_CameraType option:selected').text().trim() == "") {
            $('#ff_CameraType').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_CameraType').next().hide();
        }
        if ($('#ff_audioneed-select').val().trim() == "") {
            $('#ff_audioneed-select').next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_audioneed-select').next().next().hide();
        }
        if ($('#ff_specialconditions-select').val().trim() == "") {
            $('#ff_specialconditions-select').next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_specialconditions-select').next().next().hide();
        }
        if ($('#ff_MediaFormat option:selected').text().trim() == "") {
            $('#ff_MediaFormat').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_MediaFormat').next().hide();
        }
        if ($('#ff_VideoSpecs option:selected').text().trim() == "") {
            $('#ff_VideoSpecs').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#ff_VideoSpecs').next().hide();
        }
        var talent = [];
        $.each($("span[id^='ff_Talent_']"), function (ind, val) {
            if ($(val).text().trim() == "") {
                //$(val).next().show();
                //validCheck = false;
            }
            else {
                if ($.inArray($(val).text().trim(), talent) !== -1) {
                    $(val).next().show();
                    validCheck = false;
                }
                else {
                    talent.push($(val).text().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(val).next().hide();
                }
            }
        });
        var budget = [];
        $.each($("span[id^='ff_ShowUnit_']"), function (ind, val) {
            var index = $(this).attr('id').split('_')[2];
            if ($(val).text().trim() == "") {
                //$(val).next().show();
                //validCheck = false;
            }
            else {
                if ($.inArray($(val).text().trim() + '|' + $('#ff_BudgetCode_' + index).val().trim(), budget) !== -1) {
                    $(val).next().show();
                    validCheck = false;
                }
                else {
                    budget.push($(val).text().trim() + '|' + $('#ff_BudgetCode_' + index).val().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(val).next().hide();
                }
            }
        });

        $.each($("#fulfiller .button-edit"), function (ind, val) {
            var section = $(val).attr('title');
            if (section != 'CrewInfo') {
                if ($(val).text().trim() == "save") {
                    $('#valideditsection').show(0).delay(5000).hide(0);
                    valideditsection = true;
                    validCheck = false;
                    return false;
                }
                else {
                    validCheck = (validCheck == true) ? true : false;
                    valideditsection = false;
                    $('#valideditsection').hide();
                }
            }
        });

        if (crewRequestData.CrewType === "General Crew Request") {
            $.each($("#fulfiller .button-edit-rs"), function (ind, val) {
                var section = $(val).attr('title');
                if (section != 'CrewInfo') {
                    if ($(val).text().trim() == "save") {
                        $('#valideditsection').show(0).delay(5000).hide(0);
                        valideditsection = true;
                        validCheck = false;
                        return false;
                    }
                    else {
                        validCheck = (validCheck == true) ? true : false;
                        valideditsection = (valideditsection == true) ? true : false;
                        if (!valideditsection) {
                            $('#valideditsection').hide();
                        }
                    }
                }
            });
        }
        if ($('.sp-peoplepicker-errorMsg').is(':visible')) {
            validCheck = false;
        }

        if ($('#resourcesPage .form-override').is(":visible")) {
            if ($('#ff_OverrideApproval').children('select').val().trim() == "") {
                $('#ff_OverrideApproval').next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#ff_OverrideApproval').next().hide();
            }
            if ($('#ff_reason-select').val().trim() == "") {
                $('#ff_reason-select').next().next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#ff_reason-select').next().next().hide();
            }
            if ($('#ff_txtResourceDesc').val().trim() == "") {
                $('#ff_txtResourceDesc').next().next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#ff_txtResourceDesc').next().next().hide();
            }
        }

        return validCheck;
    };

    /** Save data to the respective list **/
    this.SaveItem = function (event) {
        validCheck = getValidate();

        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && NBCU.Fulfiller.Helper.staticCrewRequestID != "") {
            collectNewCrewData();
            NBCU.Fulfiller.Helper.newCrewRequestData.CrewStatus = $(this).attr('title').replace(' + ', '');
            NBCU.Fulfiller.Helper.newCrewRequestData.__metadata = { 'type': 'SP.Data.CrewRequestListItem' }
            NBCU.Fulfiller.Helper.updateItem(NBCU.Fulfiller.Helper.newCrewRequestData, 'CrewRequest', NBCU.Fulfiller.Helper.staticCrewRequestID);
            var revisedComments = "";
            var revisedNum = "";
            var currentdateobj = new Date();
            var currdate = NBCU.Fulfiller.Helper.dateParse(currentdateobj);
            var currdtime = currentdateobj.getHours() + ":"
                        + currentdateobj.getMinutes() + ":"
                        + currentdateobj.getSeconds();

            if ($(this).attr('title') == "Save + Revise" || $('.label-status').next().find('.active').text() == "Revised") {
                revisedComments = "Corrected start date to " + currdate;
                revisedNum = "Revised";
            }
            else {
                revisedComments = "Modified";
                revisedNum = "Modified";
            }

            var revisionNote_data = [];
            revisionNote_data = {
                __metadata: { 'type': 'SP.Data.CRT_x005f_RevisionNotesListItem' },
                Title: "General Crew Request",
                RevisedBy: $('.ms-core-menu-root:eq(0)').contents().first().text(),
                RevisedComments: $('#ff_RevisionNotes').val(),
                RevicedDate: currdate + "  " + currdtime,
                RevisedNumber: revisedNum,
                CrewRequestID: NBCU.Fulfiller.Helper.staticCrewRequestID.toString()
            };
            NBCU.Fulfiller.Helper.addItem(revisionNote_data, 'CRT_RevisionNotes');

            NBCU.Fulfiller.Helper.checkRemove('CRT_Talent', NBCU.Fulfiller.Helper.staticCrewRequestID, 'CrewRequestID');
            $.each($("span[id^='ff_Talent_']"), function (ind, val) {
                if ($(val).text().trim() != "") {
                    var talentIndex = val.id.split("_")[2];
                    talent_data = {
                        __metadata: { 'type': 'SP.Data.CRT_x005f_TalentListItem' },
                        Title: $(val).text(),
                        CrewRequestID: NBCU.Fulfiller.Helper.staticCrewRequestID.toString(),
                        TalentID: $(val).attr('ff_talent_id_' + talentIndex).trim()
                    };
                    NBCU.Fulfiller.Helper.addItem(talent_data, 'CRT_Talent');
                }
            });

            NBCU.Fulfiller.Helper.checkRemove('CRT_ShowUnit', NBCU.Fulfiller.Helper.staticCrewRequestID, 'RequestID');
            $.each($("span[id^='ff_ShowUnit_']"), function (ind, val) {
                if ($(val).text().trim() != "") {
                    var showUnitIndex = val.id.split("_")[2];
                    showunit_data = {
                        __metadata: { 'type': 'SP.Data.CRT_x005f_ShowUnitListItem' },
                        Title: $(val).text(),
                        RequestID: NBCU.Fulfiller.Helper.staticCrewRequestID.toString(),
                        ShowUnitID: $(val).attr('ff_showunit_id_' + showUnitIndex).trim(),
                        AssignedBudgetCode: $('#ff_BudgetCode_' + showUnitIndex).text()
                    };
                    NBCU.Fulfiller.Helper.addItem(showunit_data, 'CRT_ShowUnit');
                }
            });

            //NBCU.Fulfiller.Helper.checkRemove('CRT_ShootDescription', NBCU.Fulfiller.Helper.staticCrewRequestID, 'RequestID');
            //$.each($('.shoot-selected'), function (ind, val) {
            //    shootDesc_data = {
            //        __metadata: { 'type': 'SP.Data.CRT_x005f_ShootDescriptionListItem' },
            //        Title: $(this).find('.shoot-label:eq(0)').text(),
            //        ShootDescription: $(this).find('.descShoot').val(),
            //        MeetTime: $(this).find('.meetShoot').val(),
            //        RequestID: NBCU.Fulfiller.Helper.staticCrewRequestID.toString()
            //    };
            //    NBCU.Fulfiller.Helper.addItem(shootDesc_data, 'CRT_ShootDescription');
            //});

            ///** Save/Update Shoot description data into list**/
            //NBCU.Fulfiller.Helper.checkRemove('CRT_TempShootDesc', NBCU.Fulfiller.Helper.staticCrewRequestID.toString(), 'CrewRequestID');
            //var tempShootDesc_data = [];
            //$.each(NBCU.Fulfiller.Helper.shootDesc, function (tempInd, tempVal) {
            //    tempShootDesc_data = {
            //        __metadata: { 'type': 'SP.Data.CRT_x005f_TempShootDescListItem' },
            //        Title: tempVal.SelectedDate,
            //        MeetTime: tempVal.MeetTime,
            //        Desc: tempVal.Desc,
            //        SelectedDate: tempVal.SelectedDate,
            //        CrewRequestID: NBCU.Fulfiller.Helper.staticCrewRequestID.toString()
            //    };
            //    NBCU.Fulfiller.Helper.addItem(tempShootDesc_data, 'CRT_TempShootDesc');
            //})


            NBCU.Fulfiller.Helper.checkRemove('CRT_Resource', NBCU.Fulfiller.Helper.staticCrewRequestID, 'CrewRequestID');
            $.each($('.crew-info-container'), function (ind, val) {
                var resourceIndex = $(this).children().children().children().children('div').attr('id').split('_')[2];
                var resourceName = $('#ff_peoplePickerResourceDiv_' + resourceIndex + '_TopSpan span.ms-entity-resolved').text().trim();
                if (resourceName != null && resourceName != "") {
                    resource_data = {
                        __metadata: { 'type': 'SP.Data.CRT_x005f_ResourceListItem' },
                        Title: resourceName,
                        ResourceEmail: $("#ff_resource_email_" + resourceIndex).val(),
                        Resource: resourceName,
                        ResourceRole: $("#ff_resource_role_" + resourceIndex).val(),
                        ResourceEmployeeType: $("#ff_resource_employeetype_" + resourceIndex).val(),
                        ResourcePhone: $("#ff_resource_phone_" + resourceIndex).val(),
                        CrewRequestID: NBCU.Fulfiller.Helper.staticCrewRequestID.toString()
                    };
                    NBCU.Fulfiller.Helper.addItem(resource_data, 'CRT_Resource');
                }
            });

            $('#fulfiller #ff-header-status').text($('#fulfiller .button-group-status').find('.active').attr('title'))
            $('#fulfiller #ff-header-status').removeClass().addClass('button').addClass('button-' + $('#fulfiller .button-group-status').find('.active').attr('title').toLowerCase()).addClass('active');

            $('#ff-header-startdate').text($('#ff_StartDate').text());
            $('#ff-header-slug').text($('#ff_AssignmentSlug').text());
            $('#ff-header-shootstatus').text($('#ff_ShootStatus').text());
            reloadRevision();
            if ($(window).width() >= 1200) {
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
            }
            else {
                window.location.href = "/Pages/home.aspx";
            }
        }
        else {
            $.each($('.valid-msg-error:visible'), function (ind, val) {
                if (valideditsection == true) {
                    setTimeout(function () {
                        $(val).parent('div')[0].scrollIntoView(true);
                    }, 5000)
                }
                else {
                    $(val).parent('div')[0].scrollIntoView(true);
                }
                return false;
            });
        }

        event.stopPropagation();
    };

    function updateResourceName() {
        $.each($('span[id^=ff_resourcephone_]'), function (ind, val) {
            var ctrlIndex = $(val).attr('id').split('_')[2];
            var resourceName = $("#ff_peoplePickerResourceDiv_" + ctrlIndex + "_TopSpan span.ms-entity-resolved").text().trim();
            if (resourceName !== null && resourceName !== "") {
                resourceName = resourceName.replace(',', '');
                if (resourceName.indexOf('(') != "-1") {
                    resourceName = resourceName.slice(0, resourceName.indexOf('('));
                }
                var resourceRole = $('#ff_resourcerole_' + ctrlIndex).text();
                var resourceType = $('#ff_resourcetype_' + ctrlIndex).text();
                var resourceDest = '';
                if (resourceRole !== "") {
                    resourceDest = ', ' + resourceRole.toUpperCase();
                }
                if (resourceRole !== "" && resourceType !== "") {
                    resourceDest = ', ' + resourceRole.toUpperCase() + '(' + resourceType.toUpperCase() + ')';
                }
                if (resourceRole === "" && resourceType !== "") {
                    resourceDest = ', ' + '(' + resourceType.toUpperCase() + ')';
                }
                resourceName = resourceName.trim() + resourceDest;

                if (resourceRole === "" && resourceType === "") {
                    resourceName = $("#ff_peoplePickerResourceDiv_" + ctrlIndex + "_TopSpan span.ms-entity-resolved").text().trim();
                }

                $('#ff_resource_' + ctrlIndex).text(resourceName);
            }

        });
    }

    this.EditItems = function (event) {
        var ctrlTitle = $(this).attr('title');
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();
            $('#ff_productiontype').val(crewRequestData.ProductionType);
            if (ctrlTitle == "CrewInfo") {
                $('.crew-info-container .row-2').show();
                $(this).parent().parent().find('.ProducerField').show();
                $('.button-add-app').show();
                $('.button-remove-app').show();
                $('#ff_CrewDesk').css('display', 'none');
            }
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
                if (ctrlTitle == "CrewInfo") {
                    updateResourceName();
                    $('.crew-info-container .row-2').hide();
                }
                $('#ff_ProductionType').text($('#ff_productiontype').val());
                $('#ff_ShootStatus').text($('#ff_shootstatus').val());

                $('.button-remove-talent').hide();
                $('.button-remove-showunit').hide();
                $('.button-addt').hide();
                $('.button-addsu').hide();
                $('.button-add-app').hide();
                $('.button-remove-app').hide();
            }
        }
        var page = $(this).attr('title').trim();
        switch (page) {
            case editPage.whoPage:
                NBCU.Fulfiller.Who.PostBack = false;
                who_page = new NBCU.Fulfiller.Who();
                who_page.crewRequestData = crewRequestData;
                who_page.Init();
                break;
            case editPage.whatPage:
                NBCU.Fulfiller.What.PostBack = false;
                what_page = new NBCU.Fulfiller.What();
                what_page.crewRequestData = crewRequestData;
                what_page.crt_TalentData = crt_TalentData;
                what_page.crt_ShowUnitData = crt_ShowUnitData;
                what_page.crt_ShootData = crt_ShootData;
                what_page.talentData = talentData;
                what_page.storyData = storyData;
                what_page.showUnitData = showUnitData;
                what_page.productionTypeData = productionTypeData;
                what_page.Init();
                break;
            case editPage.wherePage:
                NBCU.Fulfiller.Where.PostBack = false;
                Where_page = new NBCU.Fulfiller.Where();
                Where_page.crewRequestData = crewRequestData;
                Where_page.stateData = stateData;
                Where_page.countryData = countryData;
                Where_page.Init();
                break;
            case editPage.whenPage:
                NBCU.Fulfiller.When.PostBack = false;
                When_page = new NBCU.Fulfiller.When();
                When_page.crewRequestData = crewRequestData;
                When_page.audioNeedsData = audioNeedsData;
                When_page.specialConditionData = specialConditionData;
                When_page.transmissionTypeData = transmissionTypeData;
                When_page.Init();
                break;
            case editPage.resourcesPage:
                NBCU.Fulfiller.Resources.PostBack = false;
                Resources_page = new NBCU.Fulfiller.Resources();
                Resources_page.crewRequestData = crewRequestData;
                Resources_page.talentData = talentData;
                Resources_page.talentTypeData = talentTypeData;
                Resources_page.productionTypeData = productionTypeData;
                Resources_page.audioNeedsData = audioNeedsData;
                Resources_page.specialConditionData = specialConditionData;
                Resources_page.Init();
                break;
            default:
                break;
        }
        event.stopPropagation();
    };

    this.addResourceContent = function (event) {
        NBCU.Fulfiller.Helper.cntResource++
        $(this).parent().parent().addClass('active');
        $('.subpage-crewinfo .button-edit').show();
        var resultSet = '<section class="crew-info-container">' +
            '<div class="row">' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Resource</label>' +
                '<div class="display-data1">' +
                '<div id="ff_peoplePickerResourceDiv_' + NBCU.Fulfiller.Helper.cntResource + '" class="textbox crewinfopeoplepicker"></div>' +
                '<span class="display-data" id="ff_resource_' + NBCU.Fulfiller.Helper.cntResource + '"> </span>' +
                '</div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Phone #</label>' +
                '<div class="display-data1">' +
                '<input type="text" class="selectbox ProducerField" id="ff_resource_phone_' + NBCU.Fulfiller.Helper.cntResource + '"  maxlength="21" placeholder="(XXX) XXX-XXXX">' +
                '<span style="display:none;" class="display-data" id="ff_resourcephone_' + NBCU.Fulfiller.Helper.cntResource + '"></span>' +
                '<span class="ff_resourcephone"></span>' +
                '</div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Email</label>' +
                '<div class="display-data1">' +
                '<input type="text" class="selectbox ProducerField" id="ff_resource_email_' + NBCU.Fulfiller.Helper.cntResource + '" >' +
                 '<span style="display:none;" class="display-data" id="ff_resourcemail_' + NBCU.Fulfiller.Helper.cntResource + '" ></span>' +
                '<div class="valid-msg valid-msg-error">Invalid Email Format.</div>' +
                '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row row-2">' +
            '<div class="cols cols-4 form-group resource-mobile-view">' +
                '<label class="label label-display label-producer label-addres" style="visibility:hidden"> Additional<br>' +
                'Users <span class="icon-info">i</span></label>' +
                '<div class="display-dataform display-dataform-mobile display-pf2" style="display:none">' +
                '<input type="text" class="selectbox ProducerField">' +
                '<span class="icon-search"></span> <span class="remove-button button-remove-sp"></span> </div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Role</label>' +
                '<div class="display-data1">' +
                '<select class="textbox"  id="ff_resource_role_' + NBCU.Fulfiller.Helper.cntResource + '">' +
                    '<option></option>' +
	                '<option>None</option>' +
	                '<option>Audio</option>' +
	                '<option>Camera</option>' +
	                '<option>DJ</option>' +
	                '<option>Engineer</option>' +
	                '<option>Producer</option>' +
	                '<option>Still photographer</option>' +
	                '<option>Utility/Grip</option>' +
                '</select>' +
                '<span class="display-data" id="ff_resourcerole_' + NBCU.Fulfiller.Helper.cntResource + '"></span>' +
                '</div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Employee Type</label>' +
                '<div class="display-data1 Employee-Type">' +
                '<select class="textbox"  id="ff_resource_employeetype_' + NBCU.Fulfiller.Helper.cntResource + '">' +
					'<option></option>' +
                    '<option>None</option>' +
                    '<option>Freelancer</option>' +
                    '<option>Staff</option>' +
				'</select>' +
                '<span class="display-data" id="ff_resourcetype_' + NBCU.Fulfiller.Helper.cntResource + '"></span>' +
                '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="cols cols-4 form-group button-remove-container">' +
        '<label class="label label-display label-producer" style="visibility:hidden">Resource</label>' +
        '<div class="display-data1 ">' +
        '<span class="button-remove-app">remove</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
        '</section>';
        //$('.button-add-app').closest('.row').after(resultSet);
        $(this).parent().parent().parent().prev().after(resultSet);
        initializePeoplePicker("ff_peoplePickerResourceDiv_" + NBCU.Fulfiller.Helper.cntResource, false);

        var chnageEvent = 'SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerResourceDiv_' + NBCU.Fulfiller.Helper.cntResource + '_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {' +
            //'alert("test")' +
            'var currId= peoplePickerId.split("_")[2];' +
            'if (selectedUsersInfo.length == 1) {' +
                'resourceId = currId;' +
                'ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");' +
            '}' +
            'else {' +
                        '$("#ff_resource_phone_"+currId).val("");' +
                        '$("#ff_resourcephone_"+currId).text("");' +
                        '$("#ff_resource_email_"+currId).val("");' +
                        '$("#ff_resourcemail_"+currId).text("");' +
            '}' +
        '};';
        $(this).parent().parent().parent().parent().find('.ProducerField').show();
        $(this).parent().parent().parent().parent().find('.textbox').show();
        $('.button-add-app').show();
        $('.button-remove-app').show();
        eval(chnageEvent);
        event.stopPropagation();
    }

    this.removeResourceContent = function (event) {
        $(this).closest('.crew-info-container').remove();

        event.stopPropagation();
    }

    function initializePeoplePicker(peoplePickerElementId, AllowMultipleValues) {

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
    };

    function initializePeoplePickerControl(peoplePickerElementId, displayValue) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        if (peoplePickerElementId === "ff_peoplePickerCCEmailDiv") {
            schema['AllowMultipleValues'] = true;
        }
        else {
            schema['AllowMultipleValues'] = false;
        }
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        var users = new Array(1);
        var cnt = []
        try {
            cnt = displayValue.split('|');
            if (cnt.length == 1) {
                var defaultUser = new Object();
                defaultUser.DisplayText = displayValue;
                defaultUser.EntityType = "User";
                defaultUser.IsResolved = true;
                defaultUser.Resolved = true;
                users[0] = defaultUser;      // Render and initialize the picker. 
            }
            else {
                $.each(cnt, function (index, newvalue) {
                    var defaultUser = new Object();
                    defaultUser.DisplayText = newvalue;
                    defaultUser.EntityType = "User";
                    defaultUser.IsResolved = true;
                    defaultUser.Resolved = true;
                    users[index] = defaultUser;
                });
            }
        } catch (e) {
            var defaultUser = new Object();
            defaultUser.DisplayText = displayValue;
            defaultUser.EntityType = "User";
            defaultUser.IsResolved = true;
            defaultUser.Resolved = true;
            users[0] = defaultUser;
        }

        //// Pass the ID of the DOM element that contains the picker, an array of initial
        //// PickerEntity objects to set the picker value, and a schema that defines
        //// picker properties.
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    this.ValidateResourceEmail = function () {
        $(this).next().next().hide();
        var inputVal = $(this).val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(inputVal)) {
            $(this).next().next().show();
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
        var email = personProperties.get_userProfileProperties()['WorkEmail'];

        $('#ff_resource_phone_' + resourceId).val(phoneNo);
        $('#ff_resource_email_' + resourceId).val(email);
        $('#ff_resourcephone_' + resourceId).text(phoneNo);
        $('#ff_resourcemail_' + resourceId).text(email);

        var peoplePickerId = 'ff_peoplePickerResourceDiv_' + resourceId;
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

    function resourceSelection() {

        var pT = $("#ff_productiontype").val();//production type
        var aN = $("#ff_audioneed-select").val();//audioneed
        var sC = $("#ff_specialconditions-select").val();//specialcondition

        var filProductionTypeData = $.grep(productionTypeData, function (a) {
            return a.Title == pT
        });

        var filaudioNeedsData = $.grep(audioNeedsData, function (a) {
            return a.Title == aN
        });

        var filspecialConditionData = $.grep(specialConditionData, function (a) {
            return a.Title == sC
        });

        var talentQuery = [];
        $.each($("span[id^='ff_Talent_']"), function (ind, val) {
            if ($(val).text() != "None on Site" && $(val).text() != "*TBD*" && $(val).text() != "---") {
                var talVal = $.grep(talentData, function (a) { return a.Title == $(val).text() });
                if (talVal.length != 0) {
                    talentQuery.push(talVal);
                }
            }
        });

        var finaltalentData = [];
        $.each(talentQuery, function (ind, val) {
            if (!!val[0].TalentTypeID) {
                finaltalentData.push($.grep(talentTypeData, function (a) { return a.TalentType == val[0].TalentTypeID }));
            }
        });

        var max_arr = [];
        var sp_val = 0;
        if (filProductionTypeData.length != 0) {
            if (filProductionTypeData[0].ProductionTypePointValue != "N/A") {
                max_arr.push(parseInt(filProductionTypeData[0].ProductionTypePointValue))
            }
        }
        if (filaudioNeedsData.length != 0) {
            if (filaudioNeedsData[0].AudioNeedPointValue != "N/A") {
                max_arr.push(parseInt(filaudioNeedsData[0].AudioNeedPointValue))
            }
        }
        if (filspecialConditionData.length != 0) {
            if (filspecialConditionData[0].SpecialConditionPointValue != "N/A") {
                sp_val = parseInt(filspecialConditionData[0].SpecialConditionPointValue);
            }
        }
        if (finaltalentData.length != 0) {
            $.each(finaltalentData, function (ind, val) {
                max_arr.push(parseInt(val[0].TalentTypePointValue))
            });
        }
        if (max_arr.length > 0) {
            Totalval = Math.max.apply(Math, max_arr) + sp_val;
            NBCU.Fulfiller.Helper.suggestedResource = Totalval;
            var subtotal = 0;
            if (Totalval % 2 == 0) {
                subtotal = Totalval / 2;
                $('#ff_Camera').text(subtotal);
                $('#ff_camera-select').val(subtotal);
                $('#ff_Audio').text(subtotal);
                $('#ff_audio-select').val(subtotal);
            }
            else {
                subtotal = (Totalval - 1) / 2;
                $('#ff_Camera').text(subtotal + 1);
                $('#ff_camera-select').val(subtotal + 1);
                $('#ff_Audio').text(subtotal);
                $('#ff_audio-select').val(subtotal)
            }
            $('#ff_Utilities').text(0);
            $('#ff_utilities-select').val(0);
            CrewCal();
            $('#resourcesPage .form-override').hide();
            $('#ff_reason-select').val('');
            $('#ff_ResourceReason').text('');
            $('#ff_txtResourceDesc').val('');
            $('#ff_ResourceDescription').text('');
        }

    }

    function AppendProductionType() {
        $('#ff_productiontype').find('option:not(:first)').remove();
        $.each(productionTypeData, function (index, data) {
            $('#ff_productiontype').append('<option id="' + data.ID + '">' + data.ProductionType + '</option>');
        });

    };

    function AppendAudioNeed() {
        $('#ff_audioneed-select').find('option:not(:first)').remove();
        $.each(audioNeedsData, function (index, data) {
            $('#ff_audioneed-select').append('<option id="' + data.ID + '">' + data.AudioNeed + '</option>');
        });
    };

    function AppendSpecialCondition() {
        $('#ff_specialconditions-select').find('option:not(:first)').remove();
        $.each(specialConditionData, function (index, data) {
            $('#ff_specialconditions-select').append('<option id="' + data.ID + '">' + data.SpecialConditions + '</option>');
        });
    };

    function AppendTransmissionType() {
        $('#ff_transmissiontype-select').find('option:not(:first)').remove();
        $.each(transmissionTypeData, function (index, data) {
            $('#ff_transmissiontype-select').append('<option id="' + data.ID + '">' + data.TransmissionType + '</option>');
        });
    };

    function getWebUserData() {
        var userid = _spPageContextInfo.userId;
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
        var requestHeaders = { "accept": "application/json;odata=verbose" };
        $.ajax({
            url: requestUri,
            contentType: "application/json;odata=verbose",
            headers: requestHeaders,
            success: onSuccess,
            error: onError
        });
    }

    function onSuccess(data, request) {
        NBCU.Fulfiller.Helper.currentUser = data.d.Title;
        //initContinue();
        if (NBCU.Fulfiller.Helper.currentUser !== (crewRequestData.Approver == null ? "" : crewRequestData.Approver)) {
            $('#ff_OverrideApproval').children('select').prop("disabled", true);
        }
    }

    function onError(error) {
        console.log("Error on retrieving current user.");
    }

    /* ------------- Init ------------------------ */
    this.init = function () {
        NBCU.Fulfiller.Helper.staticCrewRequestID = getUrlVars()["CRID"];
        ExecuteOrDelayUntilScriptLoaded(getWebUserData, "sp.js");
        var crewRequestPage = '';
        crewRequestData = NBCU.Fulfiller.Helper.ReadList("/sites/NMWF", "CrewRequest", NBCU.Fulfiller.Helper.staticCrewRequestID);
        crt_TalentData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "CRT_Talent", "?$select=ID,TalentID,Title&$filter=CrewRequestID eq '" + NBCU.Fulfiller.Helper.staticCrewRequestID + "'");
        crt_ShowUnitData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "CRT_ShowUnit", "?$select=ID,Title,AssignedBudgetCode,ShowUnitID&$filter=RequestID eq '" + NBCU.Fulfiller.Helper.staticCrewRequestID + "'");
        //crt_ShootData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "CRT_ShootDescription", "?$select=ID,Title,MeetTime,ShootDescription&$filter=RequestID eq '" + NBCU.Fulfiller.Helper.staticCrewRequestID + "'");
        crt_ResourceData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "CRT_Resource", "?$select=ID,Title,ResourceEmail,Resource,ResourceRole,ResourceEmployeeType,ResourcePhone&$filter=CrewRequestID eq '" + NBCU.Fulfiller.Helper.staticCrewRequestID + "'");
        storyData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "Story", "?$select=Story");
        showUnitData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "ShowUnit", "?$select=ShowUnitTitle,DefaultBudgetCode,ID");
        talentData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "Talent", "?$select=Title,TalentFirstName,TalentLastName,TalentTypeID,ID");
        productionTypeData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "ProductionType", "?$select=ID,Title,ProductionType,ProductionTypePointValue");
        stateData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "States", "?$select=Title,ID");
        countryData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "Countires", "?$select=Title,ID&$top=200");
        audioNeedsData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "AudioNeed", "?$select=Title,AudioNeed,AudioNeedPointValue,ID");
        specialConditionData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "SpecialCondition", "?$select=Title,SpecialConditions,SpecialConditionPointValue,ID");
        transmissionTypeData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "TransmissionType", "?$select=TransmissionType,TransmissionTypePointValue,ID");
        revisionNotes = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "CRT_RevisionNotes", "?$select=ID,Title,RevisedBy,RevisedComments,RevicedDate,RevisedNumber,CrewRequestID&$filter=CrewRequestID eq '" + NBCU.Fulfiller.Helper.staticCrewRequestID + "'");
        talentTypeData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "TalentType", "?select=Title,TalentType,TalentTypePointValue");
        //NBCU.Fulfiller.Helper.shootDesc = NBCU.Fulfiller.Helper.ReadListData("", "CRT_TempShootDesc", "?$select=ID,Title,MeetTime,Desc,SelectedDate,CrewRequestID&$filter=CrewRequestID eq '" + NBCU.Fulfiller.Helper.staticCrewRequestID + "'");
        addTalent(crt_TalentData);
        addShowUnit(crt_ShowUnitData);
        if (crewRequestData.CrewType === "General Crew Request") {
            $("h1.title").text('Crew Request')
        }
        else {
            $("h1.title").text(crewRequestData.CrewType)
        }

        if (crt_ShowUnitData.length > 0) {
            $('#ff-header-showimg').find('img').remove();
            $('#ff-header-showimg').text(allShowUnit);
        }

        initializePeoplePicker('ff_peoplePickerResourceDiv_0', false);
        //ff_peoplePickerResourceDiv_0
        SPClientPeoplePicker.SPClientPeoplePickerDict.ff_peoplePickerResourceDiv_0_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#ff_resource_phone_0').val("");
                $('#ff_resource_email_0').val("");
                $('#ff_resourcephone_0').text("");
                $('#ff_resourcemail_0').text("");
            }
        };

        initializePeoplePicker('ff_peoplePickerRequesterDiv', false);
        initializePeoplePicker('ff_peoplePickerProducerDiv', false);

        initializePeoplePicker('ff_peoplePickerApproverDiv', false);
        initializePeoplePicker('ff_peoplePickerCCEmailDiv', true);

        $(document).on("click", ".button-edit", EditItems);
        $(document).on("click", ".button-edit-rs", EditResource);
        $(document).on("click", ".button-next", SaveItem);
        $(document).on("click", ".button-add-app", addResourceContent);
        $(document).on("click", ".button-remove-app", removeResourceContent);

        var today = new Date();
        var todayVal = today.toISOString().split('T')[0];
        var to_day = todayVal.split('-');
        $('.intialDate').text("[" + to_day[1] + "/" + to_day[2] + "]");
        AppendProductionType();
        AppendAudioNeed();
        AppendSpecialCondition();
        AppendTransmissionType();

        $('#ff_txtStarDate').dateRangePicker({
            inline: false,
            mode: 'single',
            container: '.calender-conatainer',
            alwaysOpen: false,
            autoClose: true,
            singleMonth: true,
            stickyMonths: true,
            hoveringTooltip: function (days, startTime, hoveringTime) {
                $('#ff_Days').text(days);
                $('#ff_Days').prev('input').val(days);
            },
            setValue: function (s, s1, s2) {
                $('#ff_Days').val(parseFloat(NBCU.Fulfiller.Helper.daydiff(NBCU.Fulfiller.Helper.parseDate(s1), NBCU.Fulfiller.Helper.parseDate(s2)) + 1));
                $('#ff_Days').prev('input').val(parseFloat(NBCU.Fulfiller.Helper.daydiff(NBCU.Fulfiller.Helper.parseDate(s1), NBCU.Fulfiller.Helper.parseDate(s2)) + 1));
                $('#ff_StartDate').text(s1);
                $('#ff_EndDate').text(s2);
                $('#ff_StartDate').prev('input').val(s1);
                $('#ff_EndDate').prev('input').val(s2);
                /*var s1split = s1.split('-')[2];
                var s2split = s2.split('-')[2];
                $('.sdControl').empty();
                var bodyContent = "";
                var j = 1;
                for (var i = parseInt(s1split) ; i <= parseInt(s2split) ; i++) {
                    if (j <= 7) {
                        j++;
                        if (i.toString().length == 1) {
                            dateSelected = s1.split('-')[1] + "/" + "0" + i;
                        }
                        else {
                            dateSelected = s1.split('-')[1] + "/" + i;
                        }
                        var dateresults = $.grep(NBCU.Fulfiller.Helper.shootDesc, function (a) {
                            return a.SelectedDate == "[" + dateSelected + "]";
                        });
                        if (dateresults.length == 0) {
                            NBCU.Fulfiller.Helper.shootDesc.push({
                                SelectedDate: '[' + dateSelected + ']',
                                MeetTime: "",
                                Desc: ""
                            });
                        }
                        if (parseInt(i) == parseInt(s1split)) {
                            if (parseInt(s1split) == parseInt(s2split)) {
                                bodyContent += '<div class="shoot-selected">' +
                                                        '<div class="date-shoot" style="display:none;"><span class="shoot-label">[' + dateSelected + ']</span></div>' +
                                                        '<input type="text"  class="shoot-textbox shoot-textbox-01"/>' +
                                             '</div>';
                            }
                            else {
                                bodyContent += '<div class="shoot-selected">' +
                                                            '<div class="date-shoot"><span class="shoot-label">[' + dateSelected + ']</span></div>' +
                                                            '<div class="description-shoot"><span class="shoot-label">Description:</span></div>' +
                                                            '<input type="text"  class="shoot-textbox shoot-textbox-01 descShoot"/>' +
                                                 '</div>';
                            }
                        }
                        else {
                            bodyContent += '<div class="selectbox-full-large">' +
                                                '<span class="icon-close"></span>' +
                                                '<div class="shoot-selected">' +
                                                    '<div class="date-shoot"><span class="shoot-label intialDate">[' + dateSelected + ']</span></div>' +
                                                    '<div class="description-shoot"><span class="shoot-label">Meet Time/Location:</span>' +
                                                      '<input type="text" class="shoot-textbox meetShoot" />' +
                                                    '</div>' +
                                                    '<div class="description-shoot"><span class="shoot-label">Description:</span>' +
                                                    '<textarea  class="shoot-textbox-multi descShoot" /></textarea>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';
                        }
                    }
                    $('.sdControl').html(bodyContent);
                }
                $.each($('.date-shoot'), function (ind, val) {
                    var seldate = $(this).text();
                    var resVal = $.grep(NBCU.Fulfiller.Helper.shootDesc, function (a) {
                        return a.SelectedDate == seldate;
                    });
                    if (resVal.length == 1) {
                        $(this).parent().find('.descShoot').val(resVal[0].Desc);
                        $(this).parent().find('.meetShoot').val(resVal[0].MeetTime);
                    }
                });

                $(document).off("change", ".descShoot, .meetShoot");
                $(document).on("change", ".descShoot, .meetShoot", function () {
                    var selDate = $(this).closest('.shoot-selected').children().first().text();
                    var results = $.grep(NBCU.Fulfiller.Helper.shootDesc, function (a) {
                        return a.SelectedDate == selDate;
                    });
                    if (results.length == 1) {
                        if ($(this).attr('class').indexOf('descShoot') != -1) {
                            results[0].Desc = $(this).val()
                        }
                        else {
                            results[0].MeetTime = $(this).val()
                        }
                    }
                });*/
            }
        });

        FillData();


        $('#ff_productiontype').hide();
        $('#ff_shootstatus').hide();
        $('.button-remove-talent').hide();
        $('.button-remove-showunit').hide();
        $('.button-addt').hide();
        $('.button-addsu').hide();
        $('.button-add-app').hide();
        $('.button-remove-app').hide();
        $('#ff_state-select').hide();
        $('#ff_country-select').hide();
        $('#ff_AudioNeeds-select').hide();
        $('#ff_specialconditions-select').hide();
        $('#ff_transmissiontype-select').hide();
        //addShootDesc(crt_ShootData);
        addResource(crt_ResourceData);
        $(document).on("click", ".icon-close", function () {
            $(this).parent().remove();
        });

        $(document).on("click", ".button-remove-sp", function () {
            $('.label-addres').css("visibility", "hidden")
            $('.display-pf1').show();
            $('.display-pf2').hide();
        });
        $('.display-fullwidth .button').click(function () {
            $('.display-fullwidth .button').removeClass('active');
            $(this).addClass('active');
        });
        $(document).on("focusout", "input:text[id^='ff_resource_email_']", ValidateResourceEmail);

        if (crewRequestData.CrewType == "Bureau Camera") {
            var producerName = crewRequestData.Producer == null ? "" : crewRequestData.Producer;
            $('#ff_Producer').text(producerName);
            if (producerName !== "") {
                initializePeoplePickerControl('ff_peoplePickerProducerDiv', $('#ff_Producer').text());
            }
            $('#ff_PMobilePhone').text(crewRequestData.CellPhone1);
            $('#ff_PMobilePhone').prev('input').val(crewRequestData.CellPhone1);
            $('#ff_PDeskPhone').text(crewRequestData.DeskNumber == null ? "" : crewRequestData.DeskNumber);
            $('#ff_PDeskPhone').prev('input').val(crewRequestData.DeskNumber == null ? "" : crewRequestData.DeskNumber);
            $('#ff_ProductionType').text('LIVE/Guest');
            $('#ff_productiontype').attr("disabled", true);
            $('#ff_SpecialConditions').text('None');
            $('#ff_specialconditions-select').val('None');
            $('#ff_TransmissionType').text('FIBER/FIXED');
            $('#ff_transmissiontype-select').val('FIBER/FIXED');
            $('#ff_specialconditions-select').attr("disabled", true);
            $('#ff_transmissiontype-select').attr("disabled", true);
            $('#ff_Camera').text("1");
            $('#ff_Audio').text("0");
            $('#ff_Utilities').text("0");

            crewRequestData.SpecialConditions = "None";
            crewRequestData.TransmissionType = 'FIBER/FIXED';
            var btn_click_cntl = '<div class="forms-add-conatiner">' +
                     '<label class="label label-display">Talent (On Site) </label>' +
                     '<div class="display-dataform">' +
                         '<input type="text" class="textbox" value="Guest" id="ff_txtTalent_0"  ff_talent_id_0="4" readonly>' +
                         '<span class="display-data" id="ff_Talent_0" ff_talent_id_0="4">Guest</span>' +
                     '</div></div>';
            $('#ffTalentDiv').append(btn_click_cntl);
            $('#ff_txtTalent_0').attr("disabled", true);
            $('#ff_EditRequestId').parent().parent().hide();
            $('#ff_Attachment').parent().hide();
            var locationData = NBCU.Fulfiller.Helper.ReadListData("/sites/NMWF", "FrequentLocation", "?$select=ID,AddressLine1,Country,Zip,CrewState,CrewCity&$filter=FrequentLocationName eq '" + crewRequestData.BureauLocation + "'");
            if (locationData.length == 1) {
                $('#wherePage .button-edit').hide();
                $('#ff_Address').text(locationData[0].AddressLine1);
                $('#ff_Address').prev('input').val(locationData[0].AddressLine1);
                $('#ff_City').text(locationData[0].CrewCity);
                $('#ff_City').prev('input').val(locationData[0].CrewCity);
                $('#ff_Zip').text(locationData[0].Zip);
                $('#ff_Zip').prev('input').val(locationData[0].Zip);
                $('#ff_Country').text(locationData[0].Country);
                $('#ff_country-select').val(locationData[0].Country);
                $('#ff_State').text(locationData[0].CrewState);
                $('#ff_state-select').val(locationData[0].CrewState);
                crewRequestData.Country = locationData[0].Country;
                crewRequestData.CrewState = locationData[0].CrewState;
            }
        }
        if (crewRequestData.CrewType != "General Crew Request") {
            $('#resourcesPage .button-edit-rs').hide();
            $('#ff_OverrideApproval').parent().parent('div').hide();
            $('#ff_peoplePickerApproverDiv').parent().parent('div').hide();
            $('#ff_StoryName').prev('input').attr("disabled", true);
            var date = new Date();
            if (crewRequestData.CrewType == "Correspondent Live Shot") {
                date.setDate(date.getDate() + 1);
                $('#ff_SpecialConditions').text('None');
                $('#ff_specialconditions-select').val('None');
                $('#ff_specialconditions-select').attr("disabled", true);
                crewRequestData.SpecialConditions = "None";
                $('#ff_ProductionType').text('LIVE/Corr');
                $('#ff_productiontype').attr("disabled", true);
                $('#ff_Camera').text("1");
                $('#ff_Audio').text("1");
                $('#ff_Utilities').text("0");
            };
            if (crewRequestData.CrewType == "Breaking News") {
                $('#ff_SpecialConditions').text('Time constraints');
                $('#ff_specialconditions-select').val('Time constraints');
                crewRequestData.SpecialConditions = "Time constraints";
                $('#ff_Camera').text("1");
                $('#ff_Audio').text("1");
                $('#ff_Utilities').text("0");
                $('#ff_peoplePickerApproverDiv').parent().parent('div').hide();
                $('#ff_ProductionType').text('LIVE/TAPE');
                $('#ff_productiontype').attr("disabled", true);
                $('#ff_specialconditions-select').attr("disabled", true);
                $('#ff-meettime-hr').attr("disabled", true);
                $('#ff-meettime-min').attr("disabled", true);
                $('#ff-meettime-select').attr("disabled", true);
                $('#ff-rolltime-hr').attr("disabled", true);
                $('#ff-rolltime-min').attr("disabled", true);
                $('#ff-rolltime-select').attr("disabled", true);
            };

            var currentDate = NBCU.Fulfiller.Helper.dateParse(date);
            $('#ff_StartDate').text(currentDate);
            $('#ff_StartDate').prev('input').val(currentDate);
            $('#ff_EndDate').text(currentDate);
            $('#ff_EndDate').prev('input').val(currentDate);
            $('#ff_Days').text("1");
            $('#ff_Days').prev('input').val("1");
            var d = new Date();
            var n = d.toTimeString();
            var timeZone = '';
            try {
                timeZone = NBCU.Fulfiller.Helper.timeZone[n.slice(n.indexOf("(") + 1, -1)] == undefined ? "ET" : NBCU.Fulfiller.Helper.timeZone[n.slice(n.indexOf("(") + 1, -1)];
            } catch (e) {
                timeZone = 'ET';
            }
            $('#ff_TimeZone').text(timeZone);
            $('#ff_TimeZone').prev('select').val(timeZone);
            $('#ff_txtStarDate').attr('disabled', true)
            $('#ff_EndDate').prev('input').attr('disabled', true)
            $('#ff_TimeZone').prev('select').attr("disabled", true);
            $('#whenPage .date-shoot').hide();
            $('#ff_AudioNeeds').text('1-2 audio sources');
            $('#ff_audioneed-select').val('1-2 audio sources');
            $('#ff_audioneed-select').attr("disabled", true);
            $('#ff-header-startdate').text(currentDate);
            crewRequestData.AudioNeed = "1-2 audio sources";
            $('#ff_ShootStatus').text('Firm');
            $('#ff_shootstatus').val('Firm');
            $('#ff_shootstatus').attr("disabled", true);
            $('#ff-header-shootstatus').text('Firm');
        }
        $("#ff_CrewDesk").multiselect({
            close: function () {
                var selectedValue = $("#ff_CrewDesk").val() == null ? '' : $("#ff_CrewDesk").val().join(", ");
                $('#ff_crewdesk').text(selectedValue);
            }
        });
        var str = $('#ff_CopytoiNews_label1').text();
        str = NBCU.Fulfiller.Helper.stringFormat(str, [$('#ff_AudioNeeds').text(), $('#ff_MobilePhone').text(), $('#ff_City').text(), $('#ff_State').text()]);
        $('#ff_CopytoiNews_label1').text(str);
        str = $('#ff_CopytoiNews_label2').text();
        str = NBCU.Fulfiller.Helper.stringFormat(str, [$('#ff_AudioNeeds').text(), $('#ff_MobilePhone').text()]);
        $('#ff_CopytoiNews_label2').text(str);
        str = $('#ff_CopytoiNews_label3').text();
        str = NBCU.Fulfiller.Helper.stringFormat(str, [$('#ff-header-slug').text()]);
        $('#ff_CopytoiNews_label3').text(str);
        str = $('#ff_CopytoiNews_label4').text();
        str = NBCU.Fulfiller.Helper.stringFormat(str, [$('#ff_MeetTime').text().toLowerCase() + " ", $('#ff_TimeZone').text(), $('#ff_Producer').text(), $('#ff_PMobilePhone').text(), $('#ff_Address').text(), $('#ff_City').text(), $('#ff_State').text(), $('#ff_ProductionType').text()]);
        $('#ff_CopytoiNews_label4').text(str);
        str = $('#ff_CopytoiNews_label5').text();
        str = NBCU.Fulfiller.Helper.stringFormat(str, [$('.book-id').text()]);
        $('#ff_CopytoiNews_label5').text(str);

        $('#ff_txtMobile, #ff_txtDesk, #ff_txtPMobile, #ff_txtPDesk').keydown(function (e) {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });

        $("#ff-meettime-hr, #ff-rolltime-hr, #ff-endtime-hr").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
        });

        $("#ff-meettime-min, #ff-rolltime-min, #ff-endtime-min").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
        });

        $(document).on("keydown", "input:text[id^='ff_resource_phone_']", function (e) {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });

        $('.icon-exit').click(function () {
            SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
        });

        $('#ff_camera-select, #ff_audio-select, #ff_utilities-select').change(function () {
            var totcount = parseFloat($('#ff_camera-select').val()) + parseFloat($('#ff_audio-select').val()) + parseFloat($('#ff_utilities-select').val());
            if (totcount > NBCU.Fulfiller.Helper.suggestedResource) {
                $('#resourcesPage .form-override').show();
            }
            else {
                $('#resourcesPage .form-override').hide();
                $('#ff_reason-select').val('');
                $('#ff_ResourceReason').text('');
                $('#ff_txtResourceDesc').val('');
                $('#ff_ResourceDescription').text('');
                $('#ff_OverrideApproval').val($("#ff_OverrideApproval option:first").val());
            }

            CrewCal();
        })

        $('#ff_audioneed-select').unbind('change');
        $('#ff_audioneed-select').bind('change', resourceSelection);
        $('#ff_specialconditions-select').unbind('change');
        $('#ff_specialconditions-select').bind('change', resourceSelection);
        $('#ff_productiontype').unbind('change');
        $('#ff_productiontype').bind('change', resourceSelection);

        var dummayArr = [];
        $("#ff_txtStoryName").autocomplete({
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
                        $("#ff_txtStoryName").autocomplete("option", { source: storyData });
                    }
                });
            }
        });
    }

    return {
        Init: init,
        EditItems: this.EditItems,
        EditResource: this.EditResource,
        FillData: this.FillData
    }

}();
$(document).ready(NBCU.Fulfiller.Master.Init);