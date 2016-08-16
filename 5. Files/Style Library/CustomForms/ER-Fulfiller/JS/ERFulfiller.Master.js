NBCU.ERFulfiller.Master = function () {
    var validCheck = true;
    var editRequestData = [];
    var crt_TalentData = [];
    var editRequestShowUnitData = [];
    var crt_ShootData = [];
    var crt_ResourceData = [];
    var talentData = [];
    var productionTypeData = [];
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
    var currentUser = '';

    this.editPage = {
        ERSummaryEditPage: "Summary",
        ERcraftEditPage: "Craft",
        ERProducerEditPage: "Producer"
    };

    var userid = _spPageContextInfo.userId;

    /** Getting current user details **/
    this.GetCurrentUser = function () {
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";

        var requestHeaders = { "accept": "application/json;odata=verbose" };
        try {
            $.ajax({
                url: requestUri,
                contentType: "application/json;odata=verbose",
                headers: requestHeaders,
                success: onSuccess,
                error: onError
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    this.onSuccess = function (data, request) {
        currentUser = data.d.Title;
    }

    this.onError = function (error) {
        alert(error);
    }

    /** Fill data on load **/
    this.FillData = function () {

        $('.book-id').text(editRequestData.EditRequestID == null ? "" : editRequestData.EditRequestID);

        //if (editRequestData.ERRequestStatus != "" && editRequestData.ERRequestStatus != null && editRequestData.ERRequestStatus != "None") {
        //    $('#editRequest-fulfiller .button-group-status').find('.active').removeClass('active');
        //    $('#editRequest-fulfiller .button-group-status').find("a[title^='" + editRequestData.ERRequestStatus + "']").addClass('active');
        //    $('#editRequest-fulfiller #edrf-header-status').text($('#editRequest-fulfiller .button-group-status').find('.active').attr('title'))
        //    $('#editRequest-fulfiller #edrf-header-status').removeClass().addClass('button').addClass('button-' + $('#editRequest-fulfiller .button-group-status').find('.active').attr('title').toLowerCase()).addClass('active');
        //}

        /** SUMMARY SECTION data load **/
        var airDate = "";
        if (editRequestData.AirDate != null || editRequestData.AirDate == "") {
            //airDate = new Date(editRequestData.AirDate)
            airDate = editRequestData.AirDate;
        }
        $('#edrf_Requester_value').text(editRequestData.RequestorName);
        $('#edrf_contact_value').text(editRequestData.RequestorContact == null ? "" : editRequestData.RequestorContact);
        $('#edrf_contact_value').prev('input').val(editRequestData.RequestorContact == null ? "" : editRequestData.RequestorContact);
        $('#edrf_email_textbox').val(editRequestData.RequestorEmail == null ? "" : editRequestData.RequestorEmail);
        $('#edrf_email_value').text(editRequestData.RequestorEmail == null ? "" : editRequestData.RequestorEmail);
        $('#edrf_Producer_value').text(editRequestData.ProducerName);
        $('#edrf_SeniorProducer_value').text(editRequestData.SeniorProducer == null ? "" : editRequestData.SeniorProducer);
        $('#edrf_summary_slugname_value').text(editRequestData.Slug == null ? "" : editRequestData.Slug);
        $('#edrf_summary_slugname_value').prev('input').val(editRequestData.Slug == null ? "" : editRequestData.Slug);
        $('#edrf_summary_txtairdate_value').text(airDate);
        $('#edrf_summary_txtairdate_value').prev().prev('input').val(airDate);
        $('#edrf_summary_txtairdate_textbox').val(airDate);

        if (editRequestData.AirDateTBD === "Yes" && editRequestData.AirDateTBD !== null) {
            $('#edrf-summary-airdateTBD').prop('checked', true);
            $('#edrf-summary-airdateTBD_value').text('Yes');
        }

        $('#edrf_summary_location_edit_value').text(editRequestData.LocationofEdit == null ? "" : editRequestData.LocationofEdit);
        $('#edrf_summary_location_edit_value').prev('select').val(editRequestData.LocationofEdit == null ? "" : editRequestData.LocationofEdit);
        $('#edrf_summary_correspondent_value').text(editRequestData.Correspondent == null ? "" : editRequestData.Correspondent);
        $('#edrf_summary_correspondent_textbox').val(editRequestData.Correspondent == null ? "" : editRequestData.Correspondent);

        $('#edrf-summary-storyname_value').text(editRequestData.StoryName == null ? "" : editRequestData.StoryName);
        $('#edrf-summary-storyname').val(editRequestData.StoryName == null ? "" : editRequestData.StoryName);
        $('#edr-summary-attachcrewID_value').text(editRequestData.AttachCrewRequestID == null ? "" : editRequestData.AttachCrewRequestID);
        $('#edr-summary-attachcrewID').val(editRequestData.AttachCrewRequestID == null ? "" : editRequestData.AttachCrewRequestID);

        $('#edrf_CraftEditComments').val(editRequestData.CraftEditComments == null ? "" : editRequestData.CraftEditComments);
        $('#edrf_CraftEditComments_value').text(editRequestData.CraftEditComments == null ? "" : editRequestData.CraftEditComments);

        /** CRAFT EDIT SECTION data load **/
        var editStartDate = "";
        if (editRequestData.EditStartDate != null || editRequestData.EditStartDate == "") {
            editStartDate = new Date(editRequestData.EditStartDate)
            editStartDate = editRequestData.EditStartDate;
        }
        var tbdValue = editRequestData.PleceTBD == null ? "" : editRequestData.PleceTBD;
        $('#edrf_craft_startdate_value').text(editStartDate);
        $('#edrf_craft_startdate_textbox').val(editStartDate);

        var pieceMin = editRequestData.PleceMinutes == null ? "" : editRequestData.PleceMinutes;
        var pieceSec = editRequestData.PleceSeconds == null ? "" : editRequestData.PleceSeconds;
        var lenPieces = '';
        if (pieceMin !== '') {
            lenPieces = lenPieces + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
        }
        if (pieceSec !== '') {
            lenPieces = lenPieces + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' second ' : ' seconds ');
        }

        if (tbdValue == 'Yes') {
            lenPieces = '';
        }
        $('#edrf_length_time_value').text(lenPieces);
        $('#edrf-PieceMinutes').val(pieceMin);
        $('#edrf-PieceSeconds').val(pieceSec);
        $('#edrf_tbd_value').text(editRequestData.PleceTBD == null ? "" : editRequestData.PleceTBD);
        $('#edrf_howmany_value').text(editRequestData.PleceVersions == null ? "" : editRequestData.PleceVersions);
        $('#edr-howmany-textbox').val(editRequestData.PleceVersions == null ? "" : editRequestData.PleceVersions);

        var craftDay = editRequestData.CraftEditDays == null ? "" : editRequestData.CraftEditDays;
        var craftHrs = editRequestData.CraftEditHours == null ? "" : editRequestData.CraftEditHours;
        var craftMin = editRequestData.CraftEditMinutes == null ? "" : editRequestData.CraftEditMinutes;

        var craftEditTime = '';
        if (craftDay !== '') {
            craftEditTime = craftEditTime + craftDay + ((craftDay === '0' || craftDay === '00' || craftDay === '000' || craftDay === '1' || craftDay === '01' || craftDay === '001') ? ' day ' : ' days ');
        }
        if (craftHrs !== '') {
            craftEditTime = craftEditTime + craftHrs + ((craftHrs === '0' || craftHrs === '00' || craftHrs === '000' || craftHrs === '1' || craftHrs === '01' || craftHrs === '001') ? ' hour ' : ' hours ');
        }
        if (craftMin !== '') {
            craftEditTime = craftEditTime + craftMin + ((craftMin === '0' || craftMin === '00' || craftMin === '000' || craftMin === '1' || craftMin === '01' || craftMin === '001') ? ' minute ' : ' minutes ');
        }
        $('#edrf_craftedit-time_value').text(craftEditTime);
        $('#edrf_PieceDays_textbox').val(craftDay);
        $('#edrf_PieceHrs_textbox').val(craftHrs);
        $('#edrf_PieceMin_textbox').val(craftMin);
        $('#edrf_RequestedEditSection_value').text(editRequestData.RequestedEditSection == null ? "" : editRequestData.RequestedEditSection);
        $('#edrf-RequestedEditSection').val(editRequestData.RequestedEditSection == null ? "" : editRequestData.RequestedEditSection);
        $('#edrf_edittime_value').text(editRequestData.IsCrashEdit == null ? "" : editRequestData.IsCrashEdit);
        $('#edrf_recutweb_value').text(editRequestData.Isrecut == null ? "" : editRequestData.Isrecut);
        $('#edrf_IsFieldEditing_value').text(editRequestData.IsFieldEditing == null ? "" : editRequestData.IsFieldEditing);
        $('#edrf_IsCraftEditBrollTeasesVosSOTS_textbox_value').text(editRequestData.IsCraftEditBrollTeasesVosSOTS == null ? "" : editRequestData.IsCraftEditBrollTeasesVosSOTS);

        if ($('#edrf_tbd_value').text() == 'Yes') {
            $('#edrf-Piecetbd').attr('checked', true);
        }
        if ($('#edrf_edittime_value').text() == 'Yes') {
            $('#edrf-IsCrashEdit').attr('checked', true);
        }
        if ($('#edrf_recutweb_value').text() == 'Yes') {
            $('#edrf-Isrecut').attr('checked', true);
        }
        if ($('#edrf_IsFieldEditing_value').text() == 'Yes') {
            $('#edrf_IsFieldEditing_textbox').attr('checked', true);
        }
        if ($('#edrf_IsCraftEditBrollTeasesVosSOTS_textbox_value').text() == 'Yes') {
            $('#edrf_IsCraftEditBrollTeasesVosSOTS_textbox').attr('checked', true);
        }
        var additionRequirements = [];
        var arMusic = editRequestData.AMMusic == null ? "" : editRequestData.AMMusic;
        var arGraphics = editRequestData.AMGraphicStills == null ? "" : editRequestData.AMGraphicStills;
        var arColorCorrect = editRequestData.AMColorCorrect == null ? "" : editRequestData.AMColorCorrect;
        var arAudioCorrect = editRequestData.AMAudioCorrect == null ? "" : editRequestData.AMAudioCorrect;
        var arEffects = editRequestData.AMEffects == null ? "" : editRequestData.AMEffects;
        var arOther = editRequestData.AMOther == null ? "" : editRequestData.AMOther;
        var arOtherText = editRequestData.AROtherText == null ? "" : editRequestData.AROtherText;
        var arAllabove = editRequestData.AMAllOfTheAbove == null ? "" : editRequestData.AMAllOfTheAbove;
        if (arMusic !== "No" && arMusic !== "") {
            additionRequirements.push('Music');
            $('[name="AdditionalRequirements"]:eq(0)').attr('checked', true);
        }
        if (arGraphics !== "No" && arGraphics !== "") {
            additionRequirements.push('Graphics/Stills');
            $('[name="AdditionalRequirements"]:eq(1)').attr('checked', true);
        }
        if (arColorCorrect !== "No" && arColorCorrect !== "") {
            additionRequirements.push('Color Correct');
            $('[name="AdditionalRequirements"]:eq(2)').attr('checked', true);
        }
        if (arAudioCorrect !== "No" && arAudioCorrect !== "") {
            additionRequirements.push('Audio Correct');
            $('[name="AdditionalRequirements"]:eq(3)').attr('checked', true);
        }
        if (arEffects !== "No" && arEffects !== "") {
            additionRequirements.push('Effects');
            $('[name="AdditionalRequirements"]:eq(4)').attr('checked', true);
        }
        if (arOther !== "No" && arOther !== "") {
            $('.other-textarea').show();
            additionRequirements.push(arOtherText);
            $('[name="AdditionalRequirements"]:eq(5)').attr('checked', true);
            $('.other-textarea').addClass('active');
            $('.other-textarea.active').val(arOtherText);
        }
        if (arAllabove !== "No" && arAllabove !== "") {
            additionRequirements = [];
            if (arOtherText !== "") {
                var data = 'Music, Graphics/Stills, Color Correct, Audio Correct, Effects' + ', ' + arOtherText;
                additionRequirements.push(data);
            }
            else {
                additionRequirements.push('Music, Graphics/Stills, Color Correct, Audio Correct, Effects');
            }
            $('[name="AdditionalRequirements"]:eq(0)').attr('checked', true);
            $('[name="AdditionalRequirements"]:eq(1)').attr('checked', true);
            $('[name="AdditionalRequirements"]:eq(2)').attr('checked', true);
            $('[name="AdditionalRequirements"]:eq(3)').attr('checked', true);
            $('[name="AdditionalRequirements"]:eq(4)').attr('checked', true);
            $('[name="AdditionalRequirements"]:eq(6)').attr('checked', true);
        }

        $('#edrf_addRequirements-value').text(additionRequirements.join(', '));
        var pieceMin = editRequestData.PEMinutes == null ? "" : editRequestData.PEMinutes;
        var pieceSec = editRequestData.PESeconds == null ? "" : editRequestData.PESeconds;
        var lenPieces = '';
        if (pieceMin !== '') {
            lenPieces = lenPieces + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
        }
        if (pieceSec !== '') {
            lenPieces = lenPieces + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' second ' : ' seconds ');
        }

        /** PRODUCER EDIT SECTION data load **/
        $('#edrf_producer_Piecetbd_value').text(editRequestData.PETBD == null ? "" : editRequestData.PETBD)
        if ($('#edrf_producer_Piecetbd_value').text() == 'Yes') {
            $('#edrf_producer_Piecetbd_textbox').attr('checked', true);
            lenPieces = '';
        }

        $('#edr_producer_PieceMinutes_value').text(lenPieces);
        $('#edr_producer_PieceMinutes_textbox').val(pieceMin);
        $('#edr-producer-PieceSeconds').val(pieceSec);

        var producerDays = editRequestData.PEEstProducerDays == null ? "" : editRequestData.PEEstProducerDays;
        var producerHours = editRequestData.PEEstProducerHours == null ? "" : editRequestData.PEEstProducerHours;
        var producerMin = editRequestData.PEEstProducerMinutes == null ? "" : editRequestData.PEEstProducerMinutes;
        var producerEditTime = '';
        if (producerDays !== '') {
            producerEditTime = producerEditTime + producerDays + ((producerDays === '0' || producerDays === '00' || producerDays === '000' || producerDays === '1' || producerDays === '01' || producerDays === '001') ? ' day ' : ' days ');
        }
        if (producerHours !== '') {
            producerEditTime = producerEditTime + producerHours + ((producerHours === '0' || producerHours === '00' || producerHours === '000' || producerHours === '1' || producerHours === '01' || producerHours === '001') ? ' hour ' : ' hours ');
        }
        if (producerMin !== '') {
            producerEditTime = producerEditTime + producerMin + ((producerMin === '0' || producerMin === '00' || producerMin === '000' || producerMin === '1' || producerMin === '01' || producerMin === '001') ? ' minute ' : ' minutes ');
        }
        $('#edr_producer_crafttime_value').text(producerEditTime);
        $('#edr_producer_crafttimedays_textbox').val(producerDays);
        $('#edr_producer_crafttimehrs_textbox').val(producerHours);
        $('#edr_producer_crafttimemin_textbox').val(producerMin);

        var spotValue = editRequestData.PESpot == null ? "0" : editRequestData.PESpot;
        var roughcutValue = editRequestData.PERoughCut == null ? "0" : editRequestData.PERoughCut;
        var webpieceValue = editRequestData.PEWebPiece == null ? "0" : editRequestData.PEWebPiece;
        var brollteasesValue = editRequestData.PEBrollTeases == null ? "0" : editRequestData.PEBrollTeases;
        var sizzlereelValue = editRequestData.PESizzleReel == null ? "0" : editRequestData.PESizzleReel;
        var promosValue = editRequestData.PEPromos == null ? "0" : editRequestData.PEPromos;
        var awardsValue = editRequestData.PEAwards == null ? "0" : editRequestData.PEAwards;
        var editingData = [];

        if (spotValue !== "0") {
            $('#edr-Spot').val(spotValue);
            spotValue = 'Spot ' + spotValue;
            editingData.push(spotValue);
        }
        if (roughcutValue !== "0") {
            $('#edr-RoughCut').val(roughcutValue);
            roughcutValue = 'Rough Cut ' + roughcutValue;
            editingData.push(roughcutValue);
        }
        if (webpieceValue !== "0") {
            $('#edr-WebPiece').val(webpieceValue);
            webpieceValue = 'Web Piece ' + webpieceValue;
            editingData.push(webpieceValue);
        }
        if (brollteasesValue !== "0") {
            $('#edr-BRollTeases').val(brollteasesValue);
            brollteasesValue = 'B-Roll/Teases ' + brollteasesValue;
            editingData.push(brollteasesValue);
        }
        if (sizzlereelValue !== "0") {
            $('#edr-SizzleReel').val(sizzlereelValue);
            sizzlereelValue = 'Sizzle Reel ' + sizzlereelValue;
            editingData.push(sizzlereelValue);
        }
        if (promosValue !== "0") {
            $('#edr-Promos').val(promosValue);
            promosValue = 'Promos ' + promosValue;
            editingData.push(promosValue);
        }
        if (awardsValue !== "0") {
            $('#edr-Awards').val(awardsValue);
            awardsValue = 'Awards ' + awardsValue;
            editingData.push(awardsValue);
        }

        $('#edrf_addRequirements_value').text(editingData.join(', '));

        /** FULFILLMENT SECTION data load **/
        $('#edrf_ff_comments').val(editRequestData.FFFulfillerComments == null ? "" : editRequestData.FFFulfillerComments);

        /** POST EDIT CONFIRMATION SECTION data load **/
        $('#edrf_posteditairdate').val(editRequestData.PECAirDate == null ? "" : editRequestData.PECAirDate);
        $('#edrf_actleng_min_textbox').val(editRequestData.PECActualLengthMin == null ? "" : editRequestData.PECActualLengthMin);
        $('#edrf_actleng_sec_textbox').val(editRequestData.PECActualLengthSec == null ? "" : editRequestData.PECActualLengthSec);
        //$('#edrf_post_assito').val(editRequestData.PECAssignedToDate == null ? "" : editRequestData.PECAssignedToDate);
        //$('#edrf_post_assito_time').val(editRequestData.PECAssignedToHr == null ? "" : editRequestData.PECAssignedToHr);
        //$('#edrf_post_assito_sec').val(editRequestData.PECAssignedToSec == null ? "" : editRequestData.PECAssignedToSec);
        $('#edrf_Fulfiller_Comments').val(editRequestData.PECFulfillerComments == null ? "" : editRequestData.PECFulfillerComments);
        var pecRoughCut = editRequestData.PECRoughCut == null ? "" : editRequestData.PECRoughCut;
        var pecPiece = editRequestData.PECPiece == null ? "" : editRequestData.PECPiece;
        var pecPostEdition = editRequestData.PECPostEdition == null ? "" : editRequestData.PECPostEdition;
        if (pecRoughCut == 'Yes') {
            $('#edrf_postcut_chkbx').attr('checked', true);
        }
        else {
            $('#edrf_postcut_chkbx').attr('checked', false);
        }
        if (pecPiece == 'Yes') {
            $('#edrf_killed_chkbx').attr('checked', true);
        }
        else {
            $('#edrf_killed_chkbx').attr('checked', false);
        }
        if (pecPostEdition == 'Yes') {
            $('#edrf_confirm_chkbx').attr('checked', true);
        }
        else {
            $('#edrf_confirm_chkbx').attr('checked', false);
        }
        $('#edrf_confirm_brolls').val(editRequestData.PECBrolls == null ? "" : editRequestData.PECBrolls);
        $('#edrf_postcomment').val(editRequestData.PECPostEditComment == null ? "" : editRequestData.PECPostEditComment);

        if ($('.shwunit-msnbc').is(":visible")) {
            try {
                $('#edrf_sourcematerial-value').text(editRequestData.SourceMaterial + (editRequestData.SourceMaterialOther === null ? '' : (';' + editRequestData.SourceMaterialOther)));
                var splitSourceMaterial = editRequestData.SourceMaterial.split(';');
                for (var i = 0, l = splitSourceMaterial.length; i < l; i++) {
                    var id = splitSourceMaterial[i].replace(/ /g, "");
                    $('#edr_' + id.toLowerCase()).attr('checked', true);
                }
                if ($('#edr_other').is(':checked')) {
                    $('#ta_sourceMaterial').val((editRequestData.SourceMaterialOther === null ? '' :  editRequestData.SourceMaterialOther));
                    $("#ta_sourceMaterial").addClass('active');
                    $("#ta_sourceMaterial").show();
                }
                var sourceMaterialData = editRequestData.SourceMaterial + (editRequestData.SourceMaterialOther === null ? '' : (';' + editRequestData.SourceMaterialOther));
                var splitSourceMaterial2 = sourceMaterialData.split(';');
                var allaboveindex = splitSourceMaterial2.indexOf("All of the Above")
                var otherindex = splitSourceMaterial2.indexOf("Other")
                if (allaboveindex !== -1) {
                    splitSourceMaterial2.splice(allaboveindex, 1);
                }
                if (otherindex !== -1) {
                    splitSourceMaterial2.splice(otherindex, 1);
                }
                $('#edrf_sourcematerial-value').text(splitSourceMaterial2.join(';'));
            } catch (e) {
                $('#edrf_sourcematerial-value').text((editRequestData.SourceMaterial === null ? '' : editRequestData.SourceMaterial) + (editRequestData.SourceMaterialOther === null ? '' : (';' + editRequestData.SourceMaterialOther)));
            }
        }
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

    function getBusinee(showunit) {
        var returnedData = $.grep(showUnitData, function (element, index) {
            return element.ShowUnitTitle == showunit;
        });

        return returnedData[0];
    }

    function addShowUnit(editRequestShowUnitData) {
        if (editRequestShowUnitData.length > 0) {
            $.each(editRequestShowUnitData, function (index, new_obj) {
                NBCU.ERFulfiller.Helper.txtUnit = index;
                var showUnitValue = new_obj['Title'] === null ? "" : new_obj['Title'];
                var showUnitID = new_obj['ShowUnitID'] === null ? "" : new_obj['ShowUnitID'];
                var budgetCodeValue = new_obj['AssignedBudgetCode'] === null ? "" : new_obj['AssignedBudgetCode'];
                if (showUnitValue.indexOf('MSNBC') != -1) {
                    $('.shwunit-msnbc').show();
                }
                var business = getBusinee(showUnitValue);
                var showNetWork = "";
                if (!!business) {
                    showNetWork = business['Business'];
                }
                var btn_click_cntl = '<div class="colsshowunit"><div class="cols cols-4-5 form-group">' +
                                        '<label class="label label-display">' +
                                        'Show Unit <sup class="mandatory">*</sup>' +
                                        '</label>' +
                                        '<div class="display-dataform mandatoryallignment">' +
                                            '<input id="edrf-summary-showunit_' + index + '" class="textbox edrf_summary_showunit_textbox" value="' + showUnitValue + '" network="' + showNetWork + '">' +
                                            '<span class="display-data" id="edrf_summary_showunit_value_' + index + '" edrf_showunit_id_' + index + '="' + showUnitID + '">' + showUnitValue + '</span>' +
                                            '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                                            '<div class="valid-msg valid-msg-error">Please complete the required field </div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="cols cols-3-5 form-group">' +
                                        '<label class="label label-display">' +
                                        'Budget Code' +
                                        '</label>' +
                                        '<div class="display-dataform">' +
                                            '<input id="edrf-summary-budgetcode_' + index + '" class="textbox edrf_summary_budgetcode_textbox" value="' + budgetCodeValue + '">' +
                                            '<span class="display-data" id="edrf_summary_budgetcode_value_' + index + '">' + budgetCodeValue + '</span>' +
                                        '</div>'
                if (index != 0) {
                    btn_click_cntl += '<span class="remove-button button-remove-showunit"></span>';
                }
                btn_click_cntl += '</div>';

                if (index != 0) {
                    btn_click_cntl += '</div></div>'
                }
                else {
                    allShowUnit = new_obj['Title'];
                    btn_click_cntl += '<div class="cols cols-3-5 form-group">' +
                                    '<label class="label label-display">' +
                                        'Correspondent' +
                                    '</label>' +
                                    '<div class="display-dataform">' +
                                        '<input id="edrf_summary_correspondent_textbox" class="textbox">' +
                                        '<span class="display-data" id="edrf_summary_correspondent_value">1234567</span>' +
                                    '</div>' +
                                    '</div></div></div>';
                }

                if (index == 0) {
                    btn_click_cntl += '<div class="addbutton-container" id="edrf_ShowUnitAdd"> <span class="button-add1 button-addsu">+ add show unit</span> </div> ';
                    $('#edrf_showunit').append(btn_click_cntl);
                }
                else {
                    $('#edrf_ShowUnitAdd').before(btn_click_cntl);
                }
            });
        }
        else {
            var btn_click_cntl = '<div class="addbutton-container" id="edrf_ShowUnitAdd"> <span class="button-add1 button-addsu">+ add show unit</span> </div> ';
            $('#edrf_showunit').append(btn_click_cntl);
        }
    }

    function addResource(crt_ResourceData) {
        if (crt_ResourceData.length > 0) {
            $.each(crt_ResourceData, function (index, new_obj) {
                var resultSet = '';
                NBCU.Fulfiller.Helper.cntResource = index;
                if (index == 0) {
                    initializePeoplePickerControl('ff_peoplePickerResourceDiv_0', new_obj['Resource']);
                    $("#ff_resource_email_0").val(new_obj['ResourceEmail']);
                    $("#ff_resource_role_0").val(new_obj['ResourceRole']);
                    $("#ff_resource_employeetype_0").val(new_obj['ResourceEmployeeType']);
                    $("#ff_resource_phone_0").val(new_obj['ResourcePhone']);
                }
                else {
                    $('.button-add-app').parent().parent().addClass('active');
                    var resultSet = '<section class="crew-info-container">' +
                      '<div class="row">' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Resource</label>' +
                          '<div class="display-data1">' +
                            '<div id="ff_peoplePickerResourceDiv_' + index + '">' + new_obj['Resource'] + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Phone #</label>' +
                          '<div class="display-data1">' +
                            '<input type="text" class="selectbox ProducerField" id="ff_resource_phone_' + index + '" value="' + new_obj['ResourcePhone'] + '"  maxlength="21" placeholder="(XXX) XXX-XXXX">' +
                            '<span class="ff_resourcephone"></span>' +
                          '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Email</label>' +
                          '<div class="display-data1">' +
                            '<input type="text" class="selectbox ProducerField" id="ff_resource_email_' + index + '" value="' + new_obj['ResourceEmail'] + '">' +
                            '<div class="valid-msg valid-msg-error">Invalid Email Format.</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                      '<div class="row">' +
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
                            '<input type="text" class="selectbox ProducerField" id="ff_resource_role_' + index + '" value="' + new_obj['ResourceRole'] + '">' +
                          '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                          '<label class="label label-display label-producer">Employee Type</label>' +
                          '<div class="display-data1 Employee-Type">' +
                            '<input type="text" class="selectbox ProducerField" id="ff_resource_employeetype_' + index + '" value="' + new_obj['ResourceEmployeeType'] + '">' +
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
                    initializePeoplePickerControl("ff_peoplePickerResourceDiv_" + index, new_obj['Resource']);
                }
            });
        }
    }

    function appendEditor(editorData) {
        if (editorData.length > 0) {
            $.each(editorData, function (index, new_obj) {
                NBCU.ERFulfiller.Helper.txtEditor = index;
                if (index == 0) {
                    initializePeoplePickerControl('edrf_editor_ff_assign_textbox_0', new_obj['EditorAssigned']);
                    $('#edrf_ff_room_textbox_0').val(new_obj['Room'] === null ? "" : new_obj['Room']);
                    $('#edrf_ff_assifrom_textbox_0').val(new_obj['AssignedFromDate'] === null ? "" : new_obj['AssignedFromDate']);
                    $('#edrf_ff_assifromTime_textbox_0').val(new_obj['AssignedFromTime'] === null ? "" : new_obj['AssignedFromTime']);
                    $('#edrf_ff_assifromsec_textbox_0').val(new_obj['AssignedFromSec'] === null ? "" : new_obj['AssignedFromSec']);
                    $('#edrf_ff_assito_textbox_0').val(new_obj['AssignedToDate'] === null ? "" : new_obj['AssignedToDate']);
                    $('#edrf_ff_assitotime_textbox_0').val(new_obj['AssignedToTime'] === null ? "" : new_obj['AssignedToTime']);
                    $('#edrf_ff_assitosec_textbox_0').val(new_obj['AssignedToSec'] === null ? "" : new_obj['AssignedToSec']);

                }
                else {
                    var assignedFromDate = new_obj['AssignedFromDate'] === null ? "" : new_obj['AssignedFromDate'];
                    var assignedToDate = new_obj['AssignedToDate'] === null ? "" : new_obj['AssignedToDate'];
                    var btn_click_cntl = '<div class="additonal-editor">' +
                    '<div class="row row-2">' +
                    '<div class="cols cols-4 form-group">' +
                    '<label class="label label-display">Editor Assigned:</label>' +
                    '<div class="display-dataform">' +
                    '<div id="edrf_editor_ff_assign_textbox_' + index + '" class="textbox"/>' +
                    '<span class="display-data" id="edrf_editor_ff_assign_value_' + index + '">Editor Name </span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="cols cols-4 form-group">' +
                    '<label class="label label-display">Room</label>' +
                    '<div class="display-dataform">' +
                    '<select type="text" class="selectbox textbox" id="edrf_ff_room_textbox_' + index + '" >' +
                    '<option></option>' +
                    '</select>' +
                    '<span class="display-data" id="edrf_ff_room_value_' + index + '"></span>' +
                    '</div></div></div>' +
                    '<div class="row row-2">' +
                    '<div class="cols cols-4 form-group">' +
                    '<div class="cols-12">' +
                    '<label class="label label-display">Assigned From:</label>' +
                    '<div class="display-dataform">' +
                    '<div class="cols-6" style="float:left">' +
                    '<input type="text" class="selectbox datepicker-textbox textbox" id="edrf_ff_assifrom_textbox_' + index + '" value="' + assignedFromDate + '" readonly />' +
                    '<div class="calendar-edrf-fulfil-date" id="calendar-edrf-fulfil-date_' + index + '"></div>' +
                    '</div>' +
                    '<div class="cols-4" style="float:left">' +
                    '<select type="text" class="selectbox textbox" id="edrf_ff_assifromTime_textbox_' + index + '">' +
                    '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option>' +
                    '<option>6 AM</option><option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option>' +
                    '<option>11 AM</option><option>12 AM</option><option>1 PM</option><option>2 PM</option><option>3 PM</option>' +
                    '<option>4 PM</option><option>5 PM</option><option>6 PM</option><option>7 PM</option><option>8 PM</option>' +
		            '<option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="cols-2" style="float:left">' +
                    '<input type="text" class="edr-editor-textbox textbox" id="edrf_ff_assifromsec_textbox_' + index + '" maxlength="3" value="">' +
                    '</div><span class="display-data" id="edrf_ff_assifrom_value_' + index + '"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="cols cols-4 form-group">' +
                    '<div class="cols-12">' +
                    '<label class="label label-display">Assigned To:</label>' +
                    '<div class="display-dataform">' +
                    '<div class="cols-6" style="float:left">' +
                    '<input type="text" class="selectbox datepicker-textbox textbox" id="edrf_ff_assito_textbox_' + index + '" value="' + assignedToDate + '" readonly />' +
                    '<div class="calendar-edrf-fulfil-to-date" id="calendar-edrf-fulfil-to-date_' + index + '"></div>' +
                    '</div>' +
                    '<div class="cols-4" style="float:left">' +
                    '<select type="text" class="selectbox textbox" id="edrf_ff_assitotime_textbox_' + index + '">' +
                    '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option>' +
                    '<option>6 AM</option><option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option>' +
                    '<option>11 AM</option><option>12 AM</option><option>1 PM</option><option>2 PM</option><option>3 PM</option>' +
                    '<option>4 PM</option><option>5 PM</option><option>6 PM</option><option>7 PM</option><option>8 PM</option>' +
		            '<option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="cols-2" style="float:left">' +
                    '<input type="text" class="edr-editor-textbox textbox" id="edrf_ff_assitosec_textbox_' + index + '" maxlength="3" value="">' +
                    '</div><span class="display-data" id="edrf_ff_assito_value_' + index + '"></span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div><span class="button-remove-app button-remove-editor">remove</span>' +
                    '</div>';

                    $('.button-addeditior').before(btn_click_cntl);
                    var editorAssigned = new_obj['EditorAssigned'] === null ? "" : new_obj['EditorAssigned'];
                    if (editorAssigned !== "") {
                        initializePeoplePickerControl("edrf_editor_ff_assign_textbox_" + index, new_obj['EditorAssigned']);
                        $('#edrf_editor_ff_assign_value_' + index).text(editorAssigned);
                    }
                    $('#edrf_ff_assifromTime_textbox_' + index).val(new_obj['AssignedFromTime'] === null ? "" : new_obj['AssignedFromTime']);
                    $('#edrf_ff_assifromsec_textbox_' + index).val(new_obj['AssignedFromSec'] === null ? "" : new_obj['AssignedFromSec']);
                    $('#edrf_ff_assitotime_textbox_' + index).val(new_obj['AssignedToTime'] === null ? "" : new_obj['AssignedToTime']);
                    $('#edrf_ff_assitosec_textbox_' + index).val(new_obj['AssignedToSec'] === null ? "" : new_obj['AssignedToSec']);
                    datePickerLoad($('#edrf_ff_assifrom_textbox_' + index), $('#calendar-edrf-fulfil-date_' + index), $('#edrf_ff_assifrom_textbox_' + index));
                    datePickerLoad($('#edrf_ff_assito_textbox_' + index), $('#calendar-edrf-fulfil-to-date_' + index), $('#edrf_ff_assito_textbox_' + index));
                    appendRoom(roomData, '#edrf_ff_room_textbox_' + index);
                    $('#edrf_ff_room_textbox_' + index).val(new_obj['Room'] === null ? "" : new_obj['Room']);
                    $('#edrf_ff_room_value_' + index).text($('#edrf_ff_room_textbox_' + index).val());
                }
            });
            updateEditor();
            //$('.add-fullfillment-container .row-2').hide();
            $('.button-addeditior').hide();
            $('.button-remove-editor').hide();
        }
        else {
            $('.add-fullfillment-container .row-2').show();
            $('.subpage-ER-fullfilment .textbox').show();
            $('.button-addeditior').show();
            $('.subpage-ER-fullfilment .display-data').hide();
            $('.subpage-ER-fullfilment .button-edit').text('save');
            $('.subpage-ER-fullfilment .button-edit').hide();
        }
    }

    this.addEditor = function () {
        NBCU.ERFulfiller.Helper.txtEditor++;
        $('.subpage-ER-fullfilment .button-edit').show();
        var btn_click_cntl = '<div class="additonal-editor">' +
        '<div class="row">' +
        '<div class="cols cols-4 form-group">' +
        '<label class="label label-display">Editor Assigned:</label>' +
        '<div class="display-dataform">' +
        '<div id="edrf_editor_ff_assign_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '" class="textbox"/>' +
        '<span class="display-data" id="edrf_editor_ff_assign_value_' + NBCU.ERFulfiller.Helper.txtEditor + '">Editor Name </span>' +
        '</div>' +
        '</div>' +
        '<div class="cols cols-4 form-group">' +
        '<label class="label label-display">Room</label>' +
        '<div class="display-dataform">' +
        '<select type="text" class="selectbox textbox" id="edrf_ff_room_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '" >' +
        '<option> </option>' +
        '</select>' +
        '<span class="display-data" id="edrf_ff_room_value_' + NBCU.ERFulfiller.Helper.txtEditor + '"></span>' +
        '</div></div></div>' +
        '<div class="row row-2">' +
        '<div class="cols cols-4 form-group">' +
        '<div class="cols-12">' +
        '<label class="label label-display">Assigned From:</label>' +
        '<div class="display-dataform">' +
        '<div class="cols-6" style="float:left">' +
        '<input type="text" class="selectbox datepicker-textbox textbox" id="edrf_ff_assifrom_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '" readonly />' +
        '<div class="calendar-edrf-fulfil-date" id="calendar-edrf-fulfil-date_' + NBCU.ERFulfiller.Helper.txtEditor + '"></div>' +
        '</div>' +
        '<div class="cols-4" style="float:left">' +
        '<select type="text" class="selectbox textbox" id="edrf_ff_assifromTime_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '">' +
        '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option>' +
        '<option>6 AM</option><option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option>' +
        '<option>11 AM</option><option>12 AM</option><option>1 PM</option><option>2 PM</option><option>3 PM</option>' +
        '<option>4 PM</option><option>5 PM</option><option>6 PM</option><option>7 PM</option><option>8 PM</option>' +
		'<option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
        '</select>' +
        '</div>' +
        '<div class="cols-2" style="float:left">' +
        '<input type="text" class="edr-editor-textbox textbox" id="edrf_ff_assifromsec_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '" maxlength="3" value="">' +
        '</div><span class="display-data" id="edrf_ff_assifrom_value_' + NBCU.ERFulfiller.Helper.txtEditor + '"></span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="cols cols-4 form-group">' +
        '<div class="cols-12">' +
        '<label class="label label-display">Assigned To:</label>' +
        '<div class="display-dataform">' +
        '<div class="cols-6" style="float:left">' +
        '<input type="text" class="selectbox datepicker-textbox textbox" id="edrf_ff_assito_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '" readonly />' +
        '<div class="calendar-edrf-fulfil-to-date" id="calendar-edrf-fulfil-to-date_' + NBCU.ERFulfiller.Helper.txtEditor + '"></div>' +
        '</div>' +
        '<div class="cols-4" style="float:left">' +
        '<select type="text" class="selectbox textbox" id="edrf_ff_assitotime_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '">' +
        '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option>' +
        '<option>6 AM</option><option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option>' +
        '<option>11 AM</option><option>12 AM</option><option>1 PM</option><option>2 PM</option><option>3 PM</option>' +
        '<option>4 PM</option><option>5 PM</option><option>6 PM</option><option>7 PM</option><option>8 PM</option>' +
		'<option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
        '</select>' +
        '</div>' +
        '<div class="cols-2" style="float:left">' +
        '<input type="text" class="edr-editor-textbox textbox" id="edrf_ff_assitosec_textbox_' + NBCU.ERFulfiller.Helper.txtEditor + '" maxlength="3" value="">' +
        '</div><span class="display-data" id="edrf_ff_assito_value_' + NBCU.ERFulfiller.Helper.txtEditor + '"></span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div><span class="button-remove-app button-remove-editor">remove</span>' +
        '</div>';
        $('.button-addeditior').before(btn_click_cntl);
        $(this).parent().parent().parent().parent().find('.textbox').show();
        $(this).parent().parent().parent().parent().find('.display-data').hide();
        $('.button-remove-editor').show();
        datePickerLoad($('#edrf_ff_assifrom_textbox_' + NBCU.ERFulfiller.Helper.txtEditor), $('#calendar-edrf-fulfil-date_' + NBCU.ERFulfiller.Helper.txtEditor), $('#edrf_ff_assifrom_textbox_' + NBCU.ERFulfiller.Helper.txtEditor));
        datePickerLoad($('#edrf_ff_assito_textbox_' + NBCU.ERFulfiller.Helper.txtEditor), $('#calendar-edrf-fulfil-to-date_' + NBCU.ERFulfiller.Helper.txtEditor), $('#edrf_ff_assito_textbox_' + NBCU.ERFulfiller.Helper.txtEditor));
        initializePeoplePicker("edrf_editor_ff_assign_textbox_" + NBCU.ERFulfiller.Helper.txtEditor, false);
        appendRoom(roomData, '#edrf_ff_room_textbox_' + NBCU.ERFulfiller.Helper.txtEditor);
    }

    this.removeEditor = function () {
        $(this).closest('.additonal-editor').remove();
    }


    function returnKeyProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.edrf_peoplePickerProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += editRequestData.producerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal;
    }

    function returnKeySeniorProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.edrf_SeniorProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += editRequestData.SeniorProducerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal
    }

    function collectNewCrewData() {
        NBCU.ERFulfiller.Helper.neweditRequestData = {};
        NBCU.ERFulfiller.Helper.neweditRequestData.Title = $('#edrf_Requester_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.RequestorName = $('#edrf_Requester_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.RequestorContact = $('#edrf_contact_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.RequestorEmail = $('#edrf_email_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.ProducerName = $('#edrf_Producer_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.SeniorProducer = $('#edrf_SeniorProducer_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.Slug = $('#edrf_summary_slugname_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.AirDate = $('#edrf_summary_txtairdate_value').text();
        //AirDateTBD
        var airDateTBD = "No"
        if ($('#edrf-summary-airdateTBD').is(':checked')) {
            airDateTBD = "Yes"
        }
        NBCU.ERFulfiller.Helper.neweditRequestData.AirDateTBD = airDateTBD;
        NBCU.ERFulfiller.Helper.neweditRequestData.LocationofEdit = $('#edrf_summary_location_edit_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.Correspondent = $('#edrf_summary_correspondent_value').text();

        NBCU.ERFulfiller.Helper.neweditRequestData.StoryName = $('#edrf-summary-storyname_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.AttachCrewRequestID = $('#edr-summary-attachcrewID_value').text();

        NBCU.ERFulfiller.Helper.neweditRequestData.PleceTBD = editRequestData.PleceTBD;
        NBCU.ERFulfiller.Helper.neweditRequestData.IsCrashEdit = editRequestData.IsCrashEdit;
        NBCU.ERFulfiller.Helper.neweditRequestData.Isrecut = editRequestData.Isrecut;
        NBCU.ERFulfiller.Helper.neweditRequestData.IsFieldEditing = editRequestData.IsFieldEditing;
        NBCU.ERFulfiller.Helper.neweditRequestData.IsCraftEditBrollTeasesVosSOTS = editRequestData.IsCraftEditBrollTeasesVosSOTS;
        NBCU.ERFulfiller.Helper.neweditRequestData.AMMusic = editRequestData.AMMusic;
        NBCU.ERFulfiller.Helper.neweditRequestData.AMGraphicStills = editRequestData.AMGraphicStills;
        NBCU.ERFulfiller.Helper.neweditRequestData.AMColorCorrect = editRequestData.AMColorCorrect;
        NBCU.ERFulfiller.Helper.neweditRequestData.AMAudioCorrect = editRequestData.AMAudioCorrect;
        NBCU.ERFulfiller.Helper.neweditRequestData.AMEffects = editRequestData.AMEffects;
        NBCU.ERFulfiller.Helper.neweditRequestData.AMOther = editRequestData.AMOther;
        NBCU.ERFulfiller.Helper.neweditRequestData.AROtherText = editRequestData.AROtherText;
        NBCU.ERFulfiller.Helper.neweditRequestData.AMAllOfTheAbove = editRequestData.AMAllOfTheAbove;
        NBCU.ERFulfiller.Helper.neweditRequestData.SourceMaterial = editRequestData.SourceMaterial;
        NBCU.ERFulfiller.Helper.neweditRequestData.SourceMaterialOther = editRequestData.SourceMaterialOther;
        NBCU.ERFulfiller.Helper.neweditRequestData.PleceMinutes = $('#edrf-PieceMinutes').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PleceSeconds = $('#edrf-PieceSeconds').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PleceVersions = $('#edrf_howmany_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.EditStartDate = $('#edrf_craft_startdate_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.RequestedEditSection = $('#edrf_RequestedEditSection_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.CraftEditDays = $('#edrf_PieceDays_textbox').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.CraftEditHours = $('#edrf_PieceHrs_textbox').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.CraftEditMinutes = $('#edrf_PieceMin_textbox').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.CraftEditComments = $('#edrf_CraftEditComments_value').text();
        NBCU.ERFulfiller.Helper.neweditRequestData.PESpot = editRequestData.PESpot;
        NBCU.ERFulfiller.Helper.neweditRequestData.PERoughCut = editRequestData.PERoughCut;
        NBCU.ERFulfiller.Helper.neweditRequestData.PEWebPiece = editRequestData.PEWebPiece;
        NBCU.ERFulfiller.Helper.neweditRequestData.PEBrollTeases = editRequestData.PEBrollTeases;
        NBCU.ERFulfiller.Helper.neweditRequestData.PESizzleReel = editRequestData.PESizzleReel;
        NBCU.ERFulfiller.Helper.neweditRequestData.PEPromos = editRequestData.PEPromos;
        NBCU.ERFulfiller.Helper.neweditRequestData.PEAwards = editRequestData.PEAwards;
        NBCU.ERFulfiller.Helper.neweditRequestData.PETBD = editRequestData.PETBD;
        NBCU.ERFulfiller.Helper.neweditRequestData.PEMinutes = $('#edr_producer_PieceMinutes_textbox').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PESeconds = $('#edr-producer-PieceSeconds').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PEEstProducerDays = $('#edr_producer_crafttimedays_textbox').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PEEstProducerHours = $('#edr_producer_crafttimehrs_textbox').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PEEstProducerMinutes = $('#edr_producer_crafttimemin_textbox').val();

        NBCU.ERFulfiller.Helper.neweditRequestData.FFFulfillerComments = $('#edrf_ff_comments').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PECAirDate = $('#edrf_posteditairdate').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PECActualLengthMin = $('#edrf_actleng_min_textbox').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PECActualLengthSec = $('#edrf_actleng_sec_textbox').val();
        //NBCU.ERFulfiller.Helper.neweditRequestData.PECAssignedToDate = $('#edrf_post_assito').val();

        //NBCU.ERFulfiller.Helper.neweditRequestData.PECAssignedToHr = $('#edrf_post_assito_time').val();
        //NBCU.ERFulfiller.Helper.neweditRequestData.PECAssignedToSec = $('#edrf_post_assito_sec').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PECFulfillerComments = $('#edrf_Fulfiller_Comments').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PECBrolls = $('#edrf_confirm_brolls').val();
        NBCU.ERFulfiller.Helper.neweditRequestData.PECPostEditComment = $('#edrf_postcomment').val();
        if (currentUser === $('#edrf_Requester_value').text() || currentUser === $('#edrf_Producer_value').text()) {
            NBCU.ERFulfiller.Helper.neweditRequestData.ERRequestStatus = 'Revised ';
        }
        else {
            NBCU.ERFulfiller.Helper.neweditRequestData.ERRequestStatus = 'Completed  ';
        }

        if ($('#edrf_postcut_chkbx').is(':checked')) {
            NBCU.ERFulfiller.Helper.neweditRequestData.PECRoughCut = "Yes";
        }
        else {
            NBCU.ERFulfiller.Helper.neweditRequestData.PECRoughCut = "No";
        }
        if ($('#edrf_killed_chkbx').is(':checked')) {
            NBCU.ERFulfiller.Helper.neweditRequestData.PECPiece = "Yes";
        }
        else {
            NBCU.ERFulfiller.Helper.neweditRequestData.PECPiece = "No";
        }
        if ($('#edrf_confirm_chkbx').is(':checked')) {
            NBCU.ERFulfiller.Helper.neweditRequestData.PECPostEdition = "Yes";
        }
        else {
            NBCU.ERFulfiller.Helper.neweditRequestData.PECPostEdition = "No";
        }
        NBCU.ERFulfiller.Helper.neweditRequestData.producerKey = returnKeyProducer();
        NBCU.ERFulfiller.Helper.neweditRequestData.SeniorProducerKey = returnKeySeniorProducer();
    }

    /** Validate the field and data **/
    function getValidate() {
        validCheck = true;
        if ($('#edrf_Requester_value').text() == "" && $('#edrf_Requester_value').prev().val() == "") {
            $('#edrf_Requester_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#edrf_Requester_value').next().hide();
        }
        if ($('#edrf_Producer_value').text() == "" && $('#edrf_Producer_value').prev().val() == "") {
            $('#edrf_Producer_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#edrf_Producer_value').next().hide();
        }
        if ($('#edrf_SeniorProducer_value').text() == "" && $('#edrf_SeniorProducer_value').prev().val() == "") {
            $('#edrf_SeniorProducer_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#edrf_SeniorProducer_value').next().hide();
        }
        if ($('#edrf_summary_slugname_value').text() == "" && $('#edrf_summary_slugname_value').prev().val() == "") {
            $('#edrf_summary_slugname_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#edrf_summary_slugname_value').next().hide();
        }

        var budget = [];
        $.each($("span[id^='edrf_summary_showunit_value_']"), function (ind, val) {
            var index = $(this).attr('id').split('_')[4];
            if ($(val).text().trim() == "") {
                //$(val).next().show();
                //validCheck = false;
            }
            else {
                if ($.inArray($(val).text().trim() + '|' + $('#edrf_summary_budgetcode_value_' + index).text().trim(), budget) !== -1) {
                    $(val).next().show();
                    validCheck = false;
                }
                else {
                    budget.push($(val).text().trim() + '|' + $('#edrf_summary_budgetcode_value_' + index).text().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(val).next().hide();
                }
            }
        });

        $.each($("#editRequest-fulfiller .button-edit"), function (ind, val) {
            var section = $(val).attr('title');
            if (section !== "Fulfillment") {
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

        return validCheck;
    };

    /** Save data to the respective list **/
    this.SaveItem = function (event) {
        validCheck = getValidate();

        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && NBCU.ERFulfiller.Helper.staticEditRequestID != "") {
            collectNewCrewData();
            NBCU.ERFulfiller.Helper.neweditRequestData.__metadata = { 'type': 'SP.Data.EditRequestListItem' }
            NBCU.ERFulfiller.Helper.updateItem(NBCU.ERFulfiller.Helper.neweditRequestData, 'EditRequest', NBCU.ERFulfiller.Helper.staticEditRequestID);

            NBCU.ERFulfiller.Helper.network = [];
            NBCU.ERFulfiller.Helper.checkRemove('ER_ShowUnit', NBCU.ERFulfiller.Helper.staticEditRequestID, 'RequestID');
            $.each($("span[id^='edrf_summary_showunit_value_']"), function (ind, val) {
                if ($(val).text().trim() != "") {
                    var showUnitIndex = val.id.split("_")[4];
                    showunit_data = {
                        __metadata: { 'type': 'SP.Data.ER_x005f_ShowUnitListItem' },
                        Title: $(val).text(),
                        RequestID: NBCU.ERFulfiller.Helper.staticEditRequestID.toString(),
                        ShowUnitID: $(val).attr('edrf_showunit_id_' + showUnitIndex).trim(),
                        AssignedBudgetCode: $('#edrf_summary_budgetcode_value_' + showUnitIndex).text()
                    };
                    NBCU.ERFulfiller.Helper.addItem(showunit_data, 'ER_ShowUnit');

                    var networkData = $(val).prev().attr('network');
                    if (networkData !== "" && NBCU.ERFulfiller.Helper.network.indexOf(networkData) === -1) {
                        NBCU.ERFulfiller.Helper.network.push(networkData);
                    }
                }
            });

            if (NBCU.ERFulfiller.Helper.network.length > 0) {
                var updateData = {
                    __metadata: { 'type': 'SP.Data.EditRequestListItem' },
                    Network: NBCU.ERFulfiller.Helper.network.join(', ')
                };
                NBCU.ERFulfiller.Helper.updateItem(updateData, 'EditRequest', NBCU.ERFulfiller.Helper.staticEditRequestID);
            }

            NBCU.ERFulfiller.Helper.checkRemove('Editor', NBCU.ERFulfiller.Helper.staticEditRequestID, 'EditorRequestID');
            $.each($("input[id^='edrf_ff_assifrom_textbox_']"), function (ind, val) {
                var showEditorIndex = val.id.split("_")[4];
                var editorName = $('#edrf_editor_ff_assign_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text() === null ? "" : $('#edrf_editor_ff_assign_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim();
                if (editorName !== "") {
                    editor_data = {
                        __metadata: { 'type': 'SP.Data.EditorListItem' },
                        Title: editorName,
                        EditorAssigned: editorName,
                        Room: $('#edrf_ff_room_textbox_' + showEditorIndex).val(),
                        AssignedFromDate: $('#edrf_ff_assifrom_textbox_' + showEditorIndex).val(),
                        AssignedFromTime: $('#edrf_ff_assifromTime_textbox_' + showEditorIndex).val(),
                        AssignedFromSec: $('#edrf_ff_assifromsec_textbox_' + showEditorIndex).val(),
                        AssignedToDate: $('#edrf_ff_assito_textbox_' + showEditorIndex).val(),
                        AssignedToTime: $('#edrf_ff_assitotime_textbox_' + showEditorIndex).val(),
                        AssignedToSec: $('#edrf_ff_assitosec_textbox_' + showEditorIndex).val(),
                        EditorRequestID: NBCU.ERFulfiller.Helper.staticEditRequestID.toString()
                    };
                    NBCU.ERFulfiller.Helper.addItem(editor_data, 'Editor');
                }
            });

            if ($(window).width() >= 1200) {
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
            }
            else {
                window.location.href = "/Pages/home.aspx";
            }

            //$('#editRequest-fulfiller #edrf-header-status').text($('#editRequest-fulfiller .button-group-status').find('.active').attr('title'))
            //$('#editRequest-fulfiller #edrf-header-status').removeClass().addClass('button').addClass('button-' + $('#editRequest-fulfiller .button-group-status').find('.active').attr('title').toLowerCase()).addClass('active');
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

    function updateEditor() {
        $.each($("input[id^='edrf_ff_assifrom_textbox_']"), function (ind, val) {
            var showEditorIndex = val.id.split("_")[4];
            var assfromSec = $('#edrf_ff_assifromsec_textbox_' + showEditorIndex).val();
            var asstoSec = $('#edrf_ff_assitosec_textbox_' + showEditorIndex).val();
            var getFromSec = assfromSec !== "" ? (assfromSec + ((assfromSec === '0' || assfromSec === '00' || assfromSec === '000' || assfromSec === '1' | assfromSec === '01' || assfromSec === '001') ? ' Second' : ' Seconds')): assfromSec;
            var getToSec = asstoSec !== "" ? (asstoSec + ((asstoSec === '0' || asstoSec === '00' || asstoSec === '000' || asstoSec === '1' | asstoSec === '01' || asstoSec === '001') ? ' Second' : ' Seconds')) : asstoSec;
            $('#edrf_editor_ff_assign_value_' + showEditorIndex).text($('#edrf_editor_ff_assign_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim());
            $('#edrf_ff_room_value_' + showEditorIndex).text($('#edrf_ff_room_textbox_' + showEditorIndex).val());
            $('#edrf_ff_assifrom_value_' + showEditorIndex).text($('#edrf_ff_assifrom_textbox_' + showEditorIndex).val() + ' ' + $('#edrf_ff_assifromTime_textbox_' + showEditorIndex).val() + ' ' + getFromSec);
            $('#edrf_ff_assito_value_' + showEditorIndex).text($('#edrf_ff_assito_textbox_' + showEditorIndex).val() + ' ' + $('#edrf_ff_assitotime_textbox_' + showEditorIndex).val() + ' ' + getToSec);
        });
    }

    this.EditItems = function (event) {
        var ctrlTitle = $(this).attr('title');
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.form-edr-craft-producer').show();
            $(this).parent().parent().find('.box-edr-producer-produer').show();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('.icon-datepicker').css('display', 'inline-block');
            $(this).parent().parent().find('select').show();
            $(this).parent().parent().find('select').show();
            $('.calendar-edrf-summary-airdate').show();
            $('.calender-conatainer-edrf-craft').show();
            if ($(".form-edr-craft-producer").is(":visible") == true) {
                $('#ERProducerEditPage').css('padding-top', '10px');
            }
            if (ctrlTitle === "Fulfillment") {
                $('.add-fullfillment-container .row-2').show();
                $('.button-addeditior').show();
                $('.button-remove-editor').show();
                $(this).parent().parent().find('.cols-2').show();
            }
            if (ctrlTitle === "Craft") {
                var showUnit_MSNBC = false;
                $.each($("input[id^='edrf-summary-showunit_']"), function (ind, val) {
                    var showUnit_Value = $(val).val().toUpperCase();
                    if (showUnit_Value.indexOf('MSNBC') != -1) {
                        showUnit_MSNBC = true;
                    }
                });

                if (showUnit_MSNBC) {
                    $('.shwunit-msnbc').show();
                    $('.box-edr-Sourcematerial-checkbox').show();
                }
                else {
                    $('.shwunit-msnbc').hide();
                    $('.box-edr-Sourcematerial-checkbox').hide();
                }
            }
            $('#dis-edrf-summary-airdateTBD').hide();
        }
        else {
            if (!$('.sp-peoplepicker-errorMsg').is(':visible')) {
                $(this).text("edit");
                $(this).parent().parent().find('.display-data').each(function (ind, val) {
                    $(this).show()
                    $(this).text($(this).prev().val());
                    $(this).prev().hide();
                });
                $('#edrf_Requester_value').text($('#erqf_peoplePickerRequesterDiv span.ms-entity-resolved').text());
                $('#edrf_Producer_value').text($('#edrf_peoplePickerProducerDiv span.ms-entity-resolved').text());
                $('#edrf_SeniorProducer_value').text($('#edrf_SeniorProducerDiv span.ms-entity-resolved').text());
                if ($(".form-edr-craft-producer").is(":visible") == false) {
                    $('#ERProducerEditPage').css('padding-top', '');
                }
                if (ctrlTitle === "Fulfillment") {
                    updateEditor();
                    //$('.add-fullfillment-container .row-2').hide();
                    $(this).parent().parent().find('.textbox').hide();
                    $('.button-remove-editor').hide();
                    $('.button-addeditior').hide();
                }
            }
        }
        var page = $(this).attr('title').trim();
        switch (page) {
            case editPage.ERSummaryEditPage:
                NBCU.ERFulfiller.Summary.PostBack = false;
                summary_page = new NBCU.ERFulfiller.Summary();
                summary_page.editRequestData = editRequestData;
                summary_page.showUnitData = showUnitData;
                summary_page.editRequestShowUnitData = editRequestShowUnitData;
                summary_page.Init();
                break;
            case editPage.ERcraftEditPage:
                NBCU.ERFulfiller.Craft.PostBack = false;
                craft_page = new NBCU.ERFulfiller.Craft();
                craft_page.editRequestData = editRequestData;
                craft_page.Init();
                break;
            case editPage.ERProducerEditPage:
                NBCU.ERFulfiller.Producer.PostBack = false;
                producer_page = new NBCU.ERFulfiller.Producer();
                producer_page.editRequestData = editRequestData;
                producer_page.Init();
                break;
            default:
                break;
        }
        event.stopPropagation();
    };

    this.addResourceContent = function (event) {
        NBCU.Fulfiller.Helper.cntResource++
        $(this).parent().parent().addClass('active');
        var resultSet = '<section class="crew-info-container">' +
            '<div class="row">' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Resource</label>' +
                '<div class="display-data1">' +
                '<div id="ff_peoplePickerResourceDiv_' + NBCU.Fulfiller.Helper.cntResource + '"></div>' +
                '</div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Phone #</label>' +
                '<div class="display-data1">' +
                '<input type="text" class="selectbox ProducerField" id="ff_resource_phone_' + NBCU.Fulfiller.Helper.cntResource + '"  maxlength="21" placeholder="(XXX) XXX-XXXX">' +
                '<span class="ff_resourcephone"></span>' +
                '</div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Email</label>' +
                '<div class="display-data1">' +
                '<input type="text" class="selectbox ProducerField" id="ff_resource_email_' + NBCU.Fulfiller.Helper.cntResource + '" >' +
                '<div class="valid-msg valid-msg-error">Invalid Email Format.</div>' +
                '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
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
                '<input type="text" class="selectbox ProducerField" id="ff_resource_role_' + NBCU.Fulfiller.Helper.cntResource + '" >' +
                '</div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display label-producer">Employee Type</label>' +
                '<div class="display-data1 Employee-Type">' +
                '<input type="text" class="selectbox ProducerField" id="ff_resource_employeetype_' + NBCU.Fulfiller.Helper.cntResource + '">' +
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
        schema['AllowMultipleValues'] = false;
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
                schema['AllowMultipleValues'] = true;
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

    this.ValidateEmail = function () {
        $(this).next().next().hide();
        var inputVal = $(this).val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(inputVal)) {
            $(this).next().next().show();
        }
    }


    this.CheckShowUnit = function () {
        var showUnit_Value = $(this).val().toUpperCase();
        if (showUnit_Value.indexOf('MSNBC') != -1) {
            $('.shwunit-msnbc').show();
        }
        else {
            $('.shwunit-msnbc').hide();
        }
        var checkMsnbc = false;
        $.each($("input[id^='edrf-summary-showunit_']"), function (ind, val) {
            var showUnit_Value = $(val).val().toUpperCase();
            if (showUnit_Value.indexOf('MSNBC') != -1) {
                $('.shwunit-msnbc').show();
                checkMsnbc = true;
                if ($('span[title="Craft"]').text() === "save") {
                    $('.box-edr-Sourcematerial-checkbox').show();
                }
            }
        });
        if (!checkMsnbc) {
            $('.shwunit-msnbc').hide();
            editRequestData.SourceMaterialOther = '';
            editRequestData.SourceMaterial = '';
            $('#edrf_sourcematerial-value').text('');
            $("input[name='Sourcematerial']").prop('checked', false);
            $('#ta_sourceMaterial').val('');
            $("#ta_sourceMaterial").removeClass('active');
            $("#ta_sourceMaterial").hide();
        }
    };

    function datePickerLoad(calendarIconElement, calendarElement, calendarTextElement) {
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

    function appendRoom(roomData, ctrl) {
        $(ctrl).find('option:not(:first)').remove();
        $.each(roomData, function (index, data) {
            $(ctrl).append('<option>' + data.Title + '</option>');
        });
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
        //var phoneNo = personProperties.get_userProfileProperties()['CellPhone'];
        var deskNo = personProperties.get_userProfileProperties()['WorkPhone'];
        var email = personProperties.get_userProfileProperties()['WorkEmail'];
        //alert(email);
        $('#edrf_contact_textbox').val(deskNo);
        $('#edrf_contact_value').text(deskNo);
        $('#edrf_email_textbox').val(email);
        $('#edrf_email_value').text(email);

        var peoplePickerId = 'erqf_peoplePickerRequesterDiv';
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

    /* ------------- Init ------------------------ */
    this.init = function () {
        NBCU.ERFulfiller.Helper.staticEditRequestID = getUrlVars()["CRID"];
        editRequestData = NBCU.ERFulfiller.Helper.ReadList("/sites/NMWF", "EditRequest", NBCU.ERFulfiller.Helper.staticEditRequestID);
        editorData = NBCU.ERFulfiller.Helper.ReadListData("/sites/NMWF", "Editor", "?$select=ID, EditorAssigned,Room,AssignedFromDate,AssignedFromTime,AssignedFromSec,AssignedToDate,AssignedToTime, AssignedToSec&$filter=EditorRequestID eq '" + NBCU.ERFulfiller.Helper.staticEditRequestID + "'");
        editRequestShowUnitData = NBCU.ERFulfiller.Helper.ReadListData("/sites/NMWF", "ER_ShowUnit", "?$select=ID,Title,AssignedBudgetCode,ShowUnitID&$filter=RequestID eq '" + NBCU.ERFulfiller.Helper.staticEditRequestID + "'");
        roomData = NBCU.ERFulfiller.Helper.ReadListData("/sites/NMWF", "Room", "?$select=ID,Title,Facilities1");
        showUnitData = NBCU.ERFulfiller.Helper.ReadListData("/sites/NMWF", "ShowUnit", "?$select=ShowUnitTitle,DefaultBudgetCode,ID,Business");

        $('.shwunit-msnbc').hide();
        $(document).on("click", ".button-edit", EditItems);
        $(document).on("click", ".button-addeditior", addEditor);
        $(document).on("click", ".button-remove-editor", removeEditor);
        $('#btn-submit').unbind('click');
        $('#btn-submit').bind('click', SaveItem);

        initializePeoplePicker('erqf_peoplePickerRequesterDiv', false);
        initializePeoplePicker('edrf_peoplePickerProducerDiv', false);
        initializePeoplePicker('edrf_SeniorProducerDiv', false);
        initializePeoplePicker("edrf_editor_ff_assign_textbox_0", false);
        appendRoom(roomData, '#edrf_ff_room_textbox_0');
        addShowUnit(editRequestShowUnitData);
        appendEditor(editorData);
        $('#ta_sourceMaterial').val('');
        $("#ta_sourceMaterial").removeClass('active');
        $("#ta_sourceMaterial").hide();
        FillData();
        if (editRequestShowUnitData.length > 0) {
            $('#er-header-showimg').text(allShowUnit);
        }
        else {
            $('#er-header-showimg').text('');
        }

        initializePeoplePickerControl('erqf_peoplePickerRequesterDiv', $('#edrf_Requester_value').text());
        SPClientPeoplePicker.SPClientPeoplePickerDict.erqf_peoplePickerRequesterDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#edrf_contact_textbox').val("");
                $('#edrf_contact_value').text("");
                $('#edrf_email_textbox').val("");
                $('#edrf_email_value').text("");
            }
        };
        initializePeoplePickerControl('edrf_peoplePickerProducerDiv', $('#edrf_Producer_value').text());
        initializePeoplePickerControl('edrf_SeniorProducerDiv', $('#edrf_SeniorProducer_value').text());

        //General Edit Summary
        datePickerLoad($('#edrf-summary-airdate'), '.calendar-edrf-summary-airdate', $('#edrf_summary_txtairdate_textbox'));
        //General Edit Craft
        datePickerLoad($('#edrf-summary-start-date'), '.calender-conatainer-edrf-craft', $('#edrf_craft_startdate_textbox'));
        //Assigned from
        datePickerLoad($('#edrf_ff_assifrom_textbox_0'), $('#calendar-edrf-fulfil-date_0'), $('#edrf_ff_assifrom_textbox_0'));
        //Assigned to
        datePickerLoad($('#edrf_ff_assito_textbox_0'), $('#calendar-edrf-fulfil-to-date_0'), $('#edrf_ff_assito_textbox_0'));
        //Post air final
        datePickerLoad($('#edrf_posteditairdate_icon'), '.calendar-edrf_posteditairdate', $('#edrf_posteditairdate'));
        ////Assigned to
        //datePickerLoad($('#edrf_post_assito'), '.calendar-edrf-postedit-to-date', $('#edrf_post_assito'));

        GetCurrentUser();
        $('.button-remove-showunit').hide();
        $('.button-addsu').hide();
        $('#er-header-slug').text($('#edrf_summary_slugname_value').text());
        $('#er-header-startdate').text($('#edrf_craft_startdate_value').text() !== "" ? $('#edrf_craft_startdate_value').text() : 'TBD');

        $("input[name='AdditionalRequirements']").change(function () {
            if ($(this).next().text() == "All of the Above") {
                if ($(this).is(":checked")) {
                    $("input[name='AdditionalRequirements']").prop('checked', true);
                    $('input[name="AdditionalRequirements"]:eq(5)').next().next().addClass('active');
                    $('.other-textarea').show();
                }
                else {
                    $("input[name='AdditionalRequirements']").prop('checked', false);
                    $('input[name="AdditionalRequirements"]:eq(5)').next().next().removeClass('active');
                    $('.other-textarea').val('');
                    $('.other-textarea').hide();
                }
            }
            else {
                $("input[name='AdditionalRequirements']:eq(6)").prop('checked', false);
            }
        });

        $('input[name="AdditionalRequirements"]:eq(5)').change(function () {
            if ($(this).is(":checked")) {
                $('input[name="AdditionalRequirements"]:eq(5)').prop('checked', true);
                $(this).next().next().show();
                $(this).next().next().addClass('active');
            }
            else {
                $(this).next().next().removeClass('active');
                $('.other-textarea').val('');
                $(this).next().next().hide();
            }
        });

        $('input[name="Sourcematerial"]:eq(6)').change(function () {
            if ($(this).is(":checked")) {
                $('input[name="Sourcematerial"]:eq(6)').prop('checked', true)
                $(this).next().next().show();
                $(this).next().next().addClass('active')
            }
            else {
                $(this).next().next().removeClass('active')
                $('#ta_sourceMaterial').val('');
                $(this).next().next().hide();
            }
        });
        $("input[name='Sourcematerial']").change(function () {
            if ($(this).next().text() == "All of the Above") {
                if ($(this).is(":checked")) {
                    $("input[name='Sourcematerial']").prop('checked', true)
                    $("input[name='Sourcematerial']:eq(6)").next().next().addClass('active');
                    $("#ta_sourceMaterial").show();
                }
                else {
                    $("input[name='Sourcematerial']").prop('checked', false);
                    $("input[name='Sourcematerial']:eq(6)").next().next().removeClass('active');
                    $("#ta_sourceMaterial").val('');
                    $("#ta_sourceMaterial").hide();
                }
            }
            else {
                $("input[name='Sourcematerial']:eq(7)").prop('checked', false)
            }
        });

        ///**Request status button click event **/
        //$('.display-fullwidth .button').click(function () {
        //    $('.display-fullwidth .button').removeClass('active');
        //    $(this).addClass('active');
        //});

        $("#edrf_PieceHrs_textbox, #edr-PE-ET-Hours, #edr-LGNF-hours, #edr-LNGF-PE-length-Hours, #edr-LNGF-PE-EP-Hours, #edr-LNGF-AEE-Length-Hours, #edr-LNGF-AEE-AssEditor-Hours, #edr_producer_crafttimehrs_textbox").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
        });

        $("#edrf-PieceMinutes, #edrf-PieceSeconds, #edrf_PieceMin_textbox, #edrf_actleng_min_textbox, #edrf_actleng_sec_textbox, #edr-LNGF-CE-Length-Minutes, #edr-LNGF-CE-Length-Seconds, #edr-LNGF-PE-length-Minutes, #edr-LNGF-PE-EP-Minutes, #edr-LNGF-AEE-Length-Minutes, #edr_producer_PieceMinutes_textbox, #edr-producer-PieceSeconds, #edr_producer_crafttimemin_textbox").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
            var ctrlID = $(this).attr('id');
            if (ctrlID === 'edrf-PieceMinutes' || ctrlID === 'edrf-PieceSeconds') {
                $('#edrf-Piecetbd').attr('checked', false);
                $('#edrf_tbd_value').text('No');
            }
            if (ctrlID === 'edr_producer_PieceMinutes_textbox' || ctrlID === 'edr-producer-PieceSeconds') {
                $('#edrf_producer_Piecetbd_textbox').attr('checked', false);
                $('#edrf_producer_Piecetbd_value').text('No');
            }
        });

        $("#edr-howmany-textbox, #edrf_PieceDays_textbox, #edrf_confirm_brolls, #edr_producer_crafttimedays_textbox").keydown(function () {
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
        });

        $(document).on("keydown", "input:text[id^='edrf_ff_assifromsec_textbox_']", function (e) {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
        });

        $(document).on("keydown", "input:text[id^='edrf_ff_assitosec_textbox_']", function (e) {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
        });

        $("#edrf_contact_textbox").keydown(function () {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });


        $('#edrf-Piecetbd').change(function () {
            if ($(this).is(":checked")) {
                $('#edrf_tbd_value').text('No');
                $('#edrf-PieceMinutes').val('');
                $('#edrf-PieceSeconds').val('');
                $('#edrf_length_time_value').text('');
            }
        });

        $('#edrf_producer_Piecetbd_textbox').change(function () {
            if ($(this).is(":checked")) {
                $('#edrf_producer_Piecetbd_value').text('No');
                $('#edr_producer_PieceMinutes_textbox').val('');
                $('#edr-producer-PieceSeconds').val('');
                $('#edr_producer_PieceMinutes_value').text('');
            }
        });

        $('#edrf-summary-airdateTBD').change(function () {
            if ($(this).is(":checked")) {
                $('#edrf-summary-airdateTBD_value').text('Yes');
                $('#edrf_summary_txtairdate_textbox').val('');
                $('#edrf-summary-airdate').text('');
            }
        });

        $('#edrf-summary-airdate').click(function () {
            $('#edrf-summary-airdateTBD_value').text('No');
            $('#edrf-summary-airdateTBD').prop('checked', false);
        });

        $(document).on("focusout", "input:text[id^='edrf_email_textbox']", ValidateEmail);

        $(document).on("focusout", "input:text[id^='edrf-summary-showunit_']", CheckShowUnit);

        $('#btn-cancel').click(function () {
            if ($(window).width() >= 1200) {
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
            }
            else {
                window.location.href = "/Pages/home.aspx";
            }
        });

        if (editRequestData.ERRequestStatus !== null && editRequestData.ERRequestStatus !== "") {
            $('#er-header-shootstatus').text(editRequestData.ERRequestStatus);
            $('#edrf-header-status').text(editRequestData.ERRequestStatus);
            $('#editRequest-fulfiller #edrf-header-status').removeClass().addClass('button').addClass('button-' + editRequestData.ERRequestStatus.toLowerCase()).addClass('active');
        }
        else {
            $('#er-header-shootstatus').text('New');
            $('#editRequest-fulfiller #edrf-header-status').removeClass().addClass('button-booked').addClass('active-New');
        }

        //var currentDate = new Date()
        //var currentHr = currentDate.getHours().length > 1 ? currentDate.getHours() : '0' + currentDate.getHours();
        //var currentMin = currentDate.getMinutes().toString().length > 1 ? currentDate.getMinutes() : '0' + currentDate.getMinutes();
        //var getCurrentTime = NBCU.CrewRequest.Helper.tConvert(currentHr + ":" + currentMin);

        //currentDate = NBCU.ERFulfiller.Helper.date_Parse(currentDate) + " " + getCurrentTime;
        //if (currentUser.indexOf('(') !== -1) {
        //    currentUser = currentUser.slice(0, currentUser.indexOf('('));
        //}

        //var str = $('#footer2').text();
        //str = NBCU.Fulfiller.Helper.stringFormat(str, [currentDate, currentUser]);
        //$('#footer2').text(str);

        var dummayArr = [];
        $("#edrf-summary-storyname").autocomplete({
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
                        $("#edrf-summary-storyname").autocomplete("option", { source: storyData });
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
$(document).ready(NBCU.ERFulfiller.Master.Init);