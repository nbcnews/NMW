NBCU.LFFulfiller.Master = function () {
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
        LFSummaryEditPage: "Summary",
        LFcraftEditPage: "Craft",
        LFProducerEditPage: "Producer",
        LFAssistantEditorEditPage: "Assistant Editor"
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
            airDate = editRequestData.AirDate
        }
        var airDateTBD = editRequestData.AirDateTBD == null ? "No" : editRequestData.AirDateTBD
        $('#erLF_Requester_value').text(editRequestData.RequestorName);
        $('#erLF_contact_value').text(editRequestData.RequestorContact == null ? "" : editRequestData.RequestorContact);
        $('#edLF_contact_textbox').val(editRequestData.RequestorContact == null ? "" : editRequestData.RequestorContact);
        $('#erLF_email_textbox').val(editRequestData.RequestorEmail == null ? "" : editRequestData.RequestorEmail);
        $('#erLF_email_value').text(editRequestData.RequestorEmail == null ? "" : editRequestData.RequestorEmail);
        $('#erLF_Producer_value').text(editRequestData.ProducerName);
        $('#erLF_SeniorProducer_value').text(editRequestData.SeniorProducer == null ? "" : editRequestData.SeniorProducer);
        $('#erLF_summary_slugname_value').text(editRequestData.Slug == null ? "" : editRequestData.Slug);
        $('#erLF_summary_slug_textbox').val(editRequestData.Slug == null ? "" : editRequestData.Slug);
        $('#erLF_summary_txtairdate_value').text(airDate);
        $('#erLF_summary_txtairdate_textbox').val(airDate);
        $('#erLF_summary_txtairdate_value').text(airDate);
        $('#erLF_summary_txtairdate_textbox').val(airDate);
        $('#erLF_peopleasst_value').text(editRequestData.AssistantProducer === null ? "" : editRequestData.AssistantProducer);
        $('#edLF_summary_location_value').text(editRequestData.LocationofEdit == null ? "" : editRequestData.LocationofEdit);
        $('#edLF_summary_location').val(editRequestData.LocationofEdit == null ? "" : editRequestData.LocationofEdit);
        $('#edLF_summary_business_value').text(editRequestData.Business == null ? "" : editRequestData.Business);
        $('#edLF-summary_business').val(editRequestData.Business == null ? "" : editRequestData.Business);
        $('#edLF_summary_showunit_value_0').text(editRequestData.ShowUnit == null ? "" : editRequestData.ShowUnit);
        $('#edLF-summary-showunit_0').val(editRequestData.ShowUnit == null ? "" : editRequestData.ShowUnit);
        $('#edLF_summary_budgetcode_value_0').text(editRequestData.BudgetCode == null ? "" : editRequestData.BudgetCode);
        $('#edLF-summary-budgetcode_0').val(editRequestData.BudgetCode == null ? "" : editRequestData.BudgetCode);

        if (airDateTBD === "Yes") {
            $('#edLF-summarybd').prop('checked', true);
            $('#edLF_summary_tbd_value').text('Yes');
        }

        /** CRAFT EDIT SECTION data load **/
        var editStartDate = "";
        if (editRequestData.EditStartDate != null || editRequestData.EditStartDate == "") {
            //editStartDate = new Date(editRequestData.EditStartDate)
            editStartDate = editRequestData.EditStartDate;
        }

        var estimateDate = "";
        if (editRequestData.EsitmatedMove != null || editRequestData.EsitmatedMove == "") {
            //estimateDate = new Date(editRequestData.EsitmatedMove)
            estimateDate = editRequestData.EsitmatedMove
        }

        var firstScreenDate = "";
        if (editRequestData.DateOfFirstScreening != null || editRequestData.DateOfFirstScreening == "") {
            //firstScreenDate = new Date(editRequestData.DateOfFirstScreening)
            firstScreenDate = editRequestData.DateOfFirstScreening
        }

        var tbdValue = editRequestData.PleceTBD == null ? "" : editRequestData.PleceTBD;
        $('#edLF_craft_startdate_value').text(editStartDate);
        $('#edLF_craft_startdate_textbox').val(editStartDate);
        $('#edLF_est_editroom_value').text(estimateDate);
        $('#edLf-est-editroom').val(estimateDate);
        $('#edLF_st_screen_value').text(firstScreenDate);
        $('#edLf-st-screen').val(firstScreenDate);
        $('#edLF_crashedit_value').text(editRequestData.IsCrashEdit == null ? "" : editRequestData.IsCrashEdit);

        var pieceMin = editRequestData.PleceMinutes == null ? "" : editRequestData.PleceMinutes;
        var pieceSec = editRequestData.PleceSeconds == null ? "" : editRequestData.PleceSeconds;
        var lenPieces = '';
        if (pieceMin !== '') {
            lenPieces = lenPieces + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' hour ' : ' hours ');
        }
        if (pieceSec !== '') {
            lenPieces = lenPieces + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' minute ' : ' minutes ');
        }

        if (tbdValue == 'Yes') {
            lenPieces = '';
        }
        if ($('#edLF_crashedit_value').text() == 'Yes') {
            $('#edLF-crashedit').attr('checked', true);
        }
        $('#edLF_length_time_value').text(lenPieces);
        $('#edLF-PieceMinutes').val(pieceMin);
        $('#edLF-PieceSeconds').val(pieceSec);
        $('#edLF_tbd_value').text(editRequestData.PleceTBD == null ? "" : editRequestData.PleceTBD);
        $('#edLF_noofacts_value').text(editRequestData.PleceVersions == null ? "" : editRequestData.PleceVersions);
        $('#edLF-noofacts-textbox').val(editRequestData.PleceVersions == null ? "" : editRequestData.PleceVersions);

        var craftDay = editRequestData.CraftEditWeeks == null ? "" : editRequestData.CraftEditWeeks;
        var craftHrs = editRequestData.CraftEditDays == null ? "" : editRequestData.CraftEditDays;
        var craftMin = editRequestData.CraftEditHours == null ? "" : editRequestData.CraftEditHours;

        var craftEditTime = '';
        if (craftDay !== '') {
            craftEditTime = craftEditTime + craftDay + ((craftDay === '0' || craftDay === '00' || craftDay === '000' || craftDay === '1' || craftDay === '01' || craftDay === '001') ? ' week ' : ' weeks ');
        }
        if (craftHrs !== '') {
            craftEditTime = craftEditTime + craftHrs + ((craftHrs === '0' || craftHrs === '00' || craftHrs === '000' || craftHrs === '1' || craftHrs === '01' || craftHrs === '001') ? ' day ' : ' days ');
        }
        if (craftMin !== '') {
            craftEditTime = craftEditTime + craftMin + ((craftMin === '0' || craftMin === '00' || craftMin === '000' || craftMin === '1' || craftMin === '01' || craftMin === '001') ? ' hour ' : ' hours ');
        }
        $('#edLF_craftedit-time_value').text(craftEditTime);
        $('#edLF_PieceDays_textbox').val(craftDay);
        $('#edLF_PieceHrs_textbox').val(craftHrs);
        $('#edLF_PieceMin_textbox').val(craftMin);
        $('#edLF_noof_editor_value').text(editRequestData.NumberOfEditors == null ? "" : editRequestData.NumberOfEditors);
        $('#edLF-noof-editor').val(editRequestData.NumberOfEditors == null ? "" : editRequestData.NumberOfEditors);
        $('#edLF_edittime_value').text(editRequestData.DesktopEditShifts == null ? "" : editRequestData.DesktopEditShifts);
        $('#edLF-IsCrashEdit').val(editRequestData.DesktopEditShifts == null ? "" : editRequestData.DesktopEditShifts);
        $('#edLF_CraftEditComments_value').text(editRequestData.LFComments == null ? "" : editRequestData.LFComments);
        $('#edLF_CraftEditComments').val(editRequestData.LFComments == null ? "" : editRequestData.LFComments);

        /** PRODUCER EDIT SECTION data load **/
        var pieceHrs = editRequestData.PEHours == null ? "" : editRequestData.PEHours;
        var pieceMin = editRequestData.PEMinutes == null ? "" : editRequestData.PEMinutes;
        var lenPieces = '';
        if (pieceHrs !== '') {
            lenPieces = lenPieces + pieceHrs + ((pieceHrs === '0' || pieceHrs === '00' || pieceHrs === '000' || pieceHrs === '1' || pieceHrs === '01' || pieceHrs === '001') ? ' hour ' : ' hours ');
        }
        if (pieceMin !== '') {
            lenPieces = lenPieces + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
        }

        $('#edLF_producer_Piecetbd_value').text(editRequestData.PETBD == null ? "" : editRequestData.PETBD)
        if ($('#edLF_producer_Piecetbd_value').text() == 'Yes') {
            $('#edLF_producer_Piecetbd_textbox').attr('checked', true);
            lenPieces = '';
        }

        $('#edLF_producer_PieceMinutes_value').text(lenPieces);
        $('#edLF_producer_PieceMinutes_textbox').val(pieceHrs);
        $('#edLF-producer-PieceSeconds').val(pieceMin);

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
        $('#edLF_producer_crafttime_value').text(producerEditTime);
        $('#edLF_producer_crafttimedays_textbox').val(producerDays);
        $('#edLF_producer_crafttimehrs_textbox').val(producerHours);
        $('#edLF_producer_crafttimemin_textbox').val(producerMin);

        var spotValue = editRequestData.PESpot == null ? "0" : editRequestData.PESpot;
        var roughcutValue = editRequestData.PERoughCut == null ? "0" : editRequestData.PERoughCut;
        var webpieceValue = editRequestData.PEWebPiece == null ? "0" : editRequestData.PEWebPiece;
        var brollteasesValue = editRequestData.PEBrollTeases == null ? "0" : editRequestData.PEBrollTeases;
        var awardslValue = editRequestData.PEAwards == null ? "0" : editRequestData.PEAwards;
        var editingData = [];

        if (spotValue !== "0" && spotValue !== "00" && spotValue !== "000") {
            $('#edLF-Spot').val(spotValue);
            spotValue = 'Spot ' + spotValue;
            editingData.push(spotValue);
        }
        if (roughcutValue !== "0" && roughcutValue !== "00" && roughcutValue !== "000") {
            $('#edLF-RoughCut').val(roughcutValue);
            roughcutValue = 'Rough Cut ' + roughcutValue;
            editingData.push(roughcutValue);
        }
        if (webpieceValue !== "0" && webpieceValue !== "00" && webpieceValue !== "000") {
            $('#edLF-WebPiece').val(webpieceValue);
            webpieceValue = 'Web Piece ' + webpieceValue;
            editingData.push(webpieceValue);
        }
        if (brollteasesValue !== "0" && brollteasesValue !== "00" && brollteasesValue !== "000") {
            $('#edLF-BRollTeases').val(brollteasesValue);
            brollteasesValue = 'B-Roll/Teases ' + brollteasesValue;
            editingData.push(brollteasesValue);
        }
        if (awardslValue !== "0" && awardslValue !== "00" && awardslValue !== "000") {
            $('#edLF-Awards').val(awardslValue);
            awardslValue = 'Awards ' + awardslValue;
            editingData.push(awardslValue);
        }

        $('#edLF_addRequirements_value').text(editingData.join(', '));

        /** Assistant Editor data load **/
        var assignmentNeeded = [];
        var asIngest = editRequestData.AEIngest == null ? "" : editRequestData.AEIngest;
        var asRadioCut = editRequestData.AERadioCut == null ? "" : editRequestData.AERadioCut;
        var asAdditionElements = editRequestData.AEAdditionalElements == null ? "" : editRequestData.AEAdditionalElements;
        var asOther = editRequestData.AEOther == null ? "" : editRequestData.AEOther;
        var asAdditionElementsText = editRequestData.AEAdditionalComments == null ? "" : editRequestData.AEAdditionalComments;
        var asotherText = editRequestData.AROtherText == null ? "" : editRequestData.AROtherText;
        var assignmentType = editRequestData.AEAssignmentType == null ? "" : editRequestData.AEAssignmentType;

        if (asIngest !== "No" && asIngest !== "") {
            assignmentNeeded.push('Ingest');
            $('#checkbox-Ingest').attr('checked', true);
            $('.LNGF-AssEditor-editor-show').show();
            $('#LNGF-FileTape').val(assignmentType);
            if (assignmentType === "Tape") {
                $('.newFileIngest').hide();
            }
            else {
                $('.newFileIngest').show();
            }
            $('#LNGF-IngestHours').val(editRequestData.AEAssignmentHours == null ? "" : editRequestData.AEAssignmentHours);
            $('#LNGF-IngestMinutes').val(editRequestData.AEAssignmentMinutes == null ? "" : editRequestData.AEAssignmentMinutes);

        }
        if (asRadioCut !== "No" && asRadioCut !== "") {
            assignmentNeeded.push('Radio Cut');
            $('.edr-LNGF-AssEditor-RadioCut').attr('checked', true);
        }
        if (asOther !== "No" && asOther !== "") {
            assignmentNeeded.push(asotherText);
            $('.edr-LNGF-AssEditor-other').attr('checked', true);
            $('#txtarea-other-elemments').addClass('active');
            $('#txtarea-other-elemments.active').val(asotherText);
        }
        else {
            $('#txtarea-other-elemments').removeClass('active');
            $('#txtarea-other-elemments').val('');
            $('.show-LF-lngf-checkbox-assignment-other').hide();
        }
        if (asAdditionElements !== "No" && asAdditionElements !== "") {
            $('.show-LF-lngf-checkbox-assignment').show();
            assignmentNeeded.push(asAdditionElementsText);
            $('.edr-LNGF-AssEditor-additionalelement').attr('checked', true);
            $('#txtarea-additional-elemments').addClass('active');
            $('#txtarea-additional-elemments.active').val(asAdditionElementsText);
            //$('#txtarea-additional-elemments').show();
        }
        else {
            $('#txtarea-additional-elemments').removeClass('active');
            $('#txtarea-additional-elemments').val('');
            $('.show-LF-lngf-checkbox-assignment').hide();
        }

        $('#edLF_assignment_value').text(assignmentNeeded.join(', '));
        var tbdValue = editRequestData.AETBD == null ? "" : editRequestData.AETBD;

        var lenPieces = '';
        var pieceHrs = editRequestData.AEHours == null ? "" : editRequestData.AEHours;
        var pieceMin = editRequestData.AEMinutes == null ? "" : editRequestData.AEMinutes;
        var lenPieces = '';
        if (pieceHrs !== '') {
            lenPieces = lenPieces + pieceHrs + ((pieceHrs === '0' || pieceHrs === '00' || pieceHrs === '000' || pieceHrs === '1' || pieceHrs === '01' || pieceHrs === '001') ? ' hour ' : ' hours ');
        }
        if (pieceMin !== '') {
            lenPieces = lenPieces + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
        }
        if (tbdValue == 'Yes') {
            $('#edLF_editor_Piecetbd_textbox').attr('checked', true);
            lenPieces = '';
        }
        $('#edLF_editor_PieceMinutes_value').text(lenPieces);
        $('#edLF_editor_PieceMinutes_textbox').val(pieceHrs);
        $('#edLF-editor-PieceSeconds').val(pieceMin);
        $('#edLF_editor_Piecetbd_value').text(tbdValue);

        var asstDays = editRequestData.AEEditorDays == null ? "" : editRequestData.AEEditorDays;
        var asstHours = editRequestData.AEEditorHours == null ? "" : editRequestData.AEEditorHours;
        var asstEditTime = '';
        if (asstDays !== '') {
            asstEditTime = asstEditTime + asstDays + ((asstDays === '0' || asstDays === '00' || asstDays === '000' || asstDays === '1' || asstDays === '01' || asstDays === '001') ? ' day ' : ' days ');
        }
        if (asstHours !== '') {
            asstEditTime = asstEditTime + asstHours + ((asstHours === '0' || asstHours === '00' || asstHours === '000' || asstHours === '1' || asstHours === '01' || asstHours === '001') ? ' hour ' : ' hours ');
        }

        $('#edLF_asst_timeneed_value').text(asstEditTime);
        $('#edLF_asst_timeneed_textbox').val(asstDays);
        $('#edLF_asst_editortimehrs_textbox').val(asstHours);

        var dateNeeded = "";
        if (editRequestData.AEDateNeeded != null || editRequestData.AEDateNeeded == "") {
            //dateNeeded = new Date(editRequestData.AEDateNeeded)
            dateNeeded = editRequestData.AEDateNeeded
        }
        $('#erLF_editor_txtdate_textbox').val(dateNeeded);
        $('#erLF_editor_txtdate_value').text(dateNeeded);

        /** FULFILLMENT SECTION data load **/
        $('#edLF_LF_comments').val(editRequestData.FFFulfillerComments == null ? "" : editRequestData.FFFulfillerComments);

        /** POST EDIT CONFIRMATION SECTION data load **/
        $('#edLF_finalairdate_txtbx').val(editRequestData.PECAirDate == null ? "" : editRequestData.PECAirDate);
        $('#edLF_acthrs_txtbx').val(editRequestData.PECAssignedToHr == null ? "" : editRequestData.PECAssignedToHr);
        $('#edLF_shtroom_chkbx').val(editRequestData.PECEditShiftRooms == null ? "" : editRequestData.PECEditShiftRooms);
        $('#edLF_shftdsktp_txtbx').val(editRequestData.PECEditShiftDesktops == null ? "" : editRequestData.PECEditShiftDesktops);
        $('#edLF_fnledt_txtbx').val(editRequestData.PECFinalEditors == null ? "" : editRequestData.PECFinalEditors);
        var pecRoughCut = editRequestData.PECRoughCut == null ? "" : editRequestData.PECRoughCut;
        var pecPiece = editRequestData.PECPiece == null ? "" : editRequestData.PECPiece;
        var pecPostEdition = editRequestData.PECPostEdition == null ? "" : editRequestData.PECPostEdition;
        if (pecRoughCut == 'Yes') {
            $('#edLF_postcut_producer_chkbx').attr('checked', true);
        }
        else {
            $('#edLF_postcut_producer_chkbx').attr('checked', false);
        }
        if (pecPiece == 'Yes') {
            $('#edLF_postcut_Asst_Editor_chkbx').attr('checked', true);
        }
        else {
            $('#edLF_postcut_Asst_Editor_chkbx').attr('checked', false);
        }
        if (pecPostEdition == 'Yes') {
            $('#edLF_psotcomment_box').attr('checked', true);
        }
        else {
            $('#edLF_psotcomment_box').attr('checked', false);
        }
        $('#edLF_postcomment').val(editRequestData.PECPostEditComment == null ? "" : editRequestData.PECPostEditComment);
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

    function addShowUnit(editRequestShowUnitData) {
        if (editRequestShowUnitData.length > 0) {
            $.each(editRequestShowUnitData, function (index, new_obj) {
                NBCU.LFFulfiller.Helper.txtUnit = index;

                var btn_click_cntl = '<div class="colsshowunit"><div class="cols cols-4-5 form-group">' +
                                        '<label class="label label-display">' +
                                        'Show Unit' +
                                        '</label>' +
                                        '<div class="display-dataform">' +
                                            '<input id="edrf-summary-showunit_' + index + '" class="textbox edrf_summary_showunit_textbox" value="' + new_obj['Title'] + '">' +
                                            '<span class="display-data" id="edrf_summary_showunit_value_' + index + '" edrf_showunit_id_' + index + '="' + new_obj['ShowUnitID'] + '">' + new_obj['Title'] + '</span>' +
                                            '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="cols cols-3-5 form-group">' +
                                        '<label class="label label-display">' +
                                        'Budget Code' +
                                        '</label>' +
                                        '<div class="display-dataform">' +
                                            '<input id="edrf-summary-budgetcode_' + index + '" class="textbox edrf_summary_budgetcode_textbox" value="' + new_obj['AssignedBudgetCode'] + '">' +
                                            '<span class="display-data" id="edrf_summary_budgetcode_value_' + index + '">' + new_obj['AssignedBudgetCode'] + '</span>' +
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
                    initializePeoplePickerControl('ff_peoplePickerResourceDiv_0', new_obj['Resource'], false);
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
                    initializePeoplePickerControl("ff_peoplePickerResourceDiv_" + index, new_obj['Resource'], false);
                }
            });
        }
    }

    function appendEditor(editorData) {
        if (editorData.length > 0) {
            $.each(editorData, function (index, new_obj) {
                NBCU.LFFulfiller.Helper.txtEditor = index;
                if (index == 0) {
                    initializePeoplePicker("edLF_editor_LF_assign_textbox_0", true);
                    $('#edLF_editor_LF_assign_value_0').show();
                    var editorAssigned = new_obj['EditorAssigned'] === null ? "" : new_obj['EditorAssigned'];
                    if (editorAssigned !== "") {
                        initializePeoplePickerControl("edLF_editor_LF_assign_textbox_0", new_obj['EditorAssigned'], false);
                        $('#edLF_editor_LF_assign_value_0').text(editorAssigned);
                    }
                    $('#edLF_LF_assifrom_textbox_0').val(new_obj['AssignedFromDate']);
                    $('#edLF_LF_assifromTime_textbox_0').val(new_obj['AssignedFromTime']);
                    $('#edLF_LF_assifromsec_textbox_0').val(new_obj['AssignedFromSec']);
                    $('#edLF_LF_assito_textbox_0').val(new_obj['AssignedToDate']);
                    $('#edLF_LF_assitotime_textbox_0').val(new_obj['AssignedToTime']);
                    $('#edLF_LF_assitosec_textbox_0').val(new_obj['AssignedToSec']);

                }
                else {
                    var assignedFromDate = new_obj['AssignedFromDate'] === null ? "" : new_obj['AssignedFromDate'];
                    var assignedToDate = new_obj['AssignedToDate'] === null ? "" : new_obj['AssignedToDate'];
                    initializePeoplePicker("edLF_editor_LF_assign_textbox_" + index, true);
                    var btn_click_cntl = '<div class="row">' +
                        '<div class="cols cols-4 form-group">' +
                            '<label class="label label-display">Editor Assigned:</label>' +
                            '<div class="display-dataform">' +
                                '<div id="edLF_editor_LF_assign_textbox_' + index + '" class="textbox"></div>' +
                                '<span class="display-data" id="edLF_editor_LF_assign_value_' + index + '">Editor Name </span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                            '<div class="cols-12">' +
                                '<label class="label label-display">Assigned From:</label>' +
                                '<div class="display-dataform">' +
                                    '<div class="cols-6" style="float:left">' +
                                        '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_assifrom_textbox_' + index + '" value="' + assignedFromDate + '" readonly />' +
                                        '<div class="calendar-edLF-fulfil-date" id="calendar-edLF-fulfil-date_' + index + '"></div>' +
                                    '</div>' +
                                    '<div class="cols-4" style="float:left">' +
                                        '<select type="text" class="selectbox textbox" id="edLF_LF_assifromTime_textbox_' + index + '">' +
                                            '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                                            '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                                            '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                                            '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="cols-2" style="float:left">' +
                                        '<input type="text" class="edr-editor-textbox textbox" id="edLF_LF_assifromsec_textbox_' + index + '" maxlength="3" value="">' +
                                    '</div>' +
                                    '<span class="display-data" id="edLF_LF_assifrom_value_' + index + '"></span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                            '<div class="cols-12">' +
                                '<label class="label label-display">Assigned To:</label>' +
                                '<div class="display-dataform">' +
                                    '<div class="cols-6" style="float:left">' +
                                        '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_assito_textbox_' + index + '" value="' + assignedToDate + '" readonly />' +
                                        '<div class="calendar-edLF-fulfil-to-date" id="calendar-edLF-fulfil-to-date_' + index + '"></div>' +
                                    '</div>' +
                                    '<div class="cols-4" style="float:left">' +
                                        '<select type="text" class="selectbox textbox" id="edLF_LF_assitotime_textbox_' + index + '">' +
                                            '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                                            '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                                            '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                                            '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="cols-2" style="float:left">' +
                                        '<input type="text" class="edr-editor-textbox textbox" id="edLF_LF_assitosec_textbox_' + index + '" maxlength="3" value="">' +
                                    '</div>' +
                                    '<span class="display-data" id="edLF_LF_assito_value_' + index + '"></span>' +
                                '</div>' +
                            '</div>' +
                        '</div><div class="removebutton-container"><span class="button-remove-app button-remove-editor">remove</span></div>' +
                    '</div>';

                    $('.addbutton-container').before(btn_click_cntl);
                    var editorAssigned = new_obj['EditorAssigned'] === null ? "" : new_obj['EditorAssigned'];
                    if (editorAssigned !== "") {
                        initializePeoplePickerControl("edLF_editor_LF_assign_textbox_" + index, new_obj['EditorAssigned'], false);
                        $('#edLF_editor_LF_assign_value_' + index).text(editorAssigned);
                    }
                    datePickerLoad($('#edLF_LF_assifrom_textbox_' + NBCU.LFFulfiller.Helper.txtEditor), $('#calendar-edLF-fulfil-date_' + index), $('#edLF_LF_assifrom_textbox_' + index));
                    datePickerLoad($('#edLF_LF_assito_textbox_' + NBCU.LFFulfiller.Helper.txtEditor), $('#calendar-edLF-fulfil-to-date_' + index), $('#edLF_LF_assito_textbox_' + index));

                    $('#edLF_LF_assifromTime_textbox_' + index).val(new_obj['AssignedFromTime'] === null ? "" : new_obj['AssignedFromTime']);
                    $('#edLF_LF_assifromsec_textbox_' + index).val(new_obj['AssignedFromSec'] === null ? "" : new_obj['AssignedFromSec']);
                    $('#edLF_LF_assitotime_textbox_' + index).val(new_obj['AssignedToTime'] === null ? "" : new_obj['AssignedToTime']);
                    $('#edLF_LF_assitosec_textbox_' + index).val(new_obj['AssignedToSec'] === null ? "" : new_obj['AssignedToSec']);
                }
            });
            updateEditor();
            //$('.add-fullfillment-container .row-2').hide();
            $('.button-addeditior').hide();
            $('.button-remove-editor').hide();
        }
        else {
            $('.subpage-LF-fullfilment .textbox').show();
            $('.button-addeditior').show();
            $('.subpage-LF-fullfilment .display-data').hide();
            $('.subpage-LF-fullfilment .button-edit').text('save');
            $('.subpage-LF-fullfilment .button-edit').hide();
        }
    }

    this.addEditor = function () {
        NBCU.LFFulfiller.Helper.txtEditor++;
        $('.subpage-LF-fullfilment .button-edit').show();
        var btn_click_cntl = '<div class="row">' +
        '<div class="cols cols-4 form-group">' +
            '<label class="label label-display">Editor Assigned:</label>' +
            '<div class="display-dataform">' +
                '<div id="edLF_editor_LF_assign_textbox_' + NBCU.LFFulfiller.Helper.txtEditor + '" class="textbox"></div>' +
                '<span class="display-data" id="edLF_editor_LF_assign_value_' + NBCU.LFFulfiller.Helper.txtEditor + '">Editor Name </span>' +
            '</div>' +
        '</div>' +
        '<div class="cols cols-4 form-group">' +
            '<div class="cols-12">' +
                '<label class="label label-display">Assigned From:</label>' +
                '<div class="display-dataform">' +
                    '<div class="cols-6" style="float:left">' +
                        '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_assifrom_textbox_' + NBCU.LFFulfiller.Helper.txtEditor + '" readonly />' +
                        '<div class="calendar-edLF-fulfil-date" id="calendar-edLF-fulfil-date_' + NBCU.LFFulfiller.Helper.txtEditor + '"></div>' +
                    '</div>' +
                    '<div class="cols-4" style="float:left">' +
                        '<select type="text" class="selectbox textbox" id="edLF_LF_assifromTime_textbox_' + NBCU.LFFulfiller.Helper.txtEditor + '">' +
                            '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                            '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                            '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                            '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="cols-2" style="float:left">' +
                        '<input type="text" class="textbox edr-editor-textbox" id="edLF_LF_assifromsec_textbox_' + NBCU.LFFulfiller.Helper.txtEditor + '" maxlength="3" value="">' +
                    '</div>' +
                    '<span class="display-data" id="edLF_LF_assifrom_value_' + NBCU.LFFulfiller.Helper.txtEditor + '"></span>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="cols cols-4 form-group">' +
            '<div class="cols-12">' +
                '<label class="label label-display">Assigned To:</label>' +
                '<div class="display-dataform">' +
                    '<div class="cols-6" style="float:left">' +
                        '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_assito_textbox_' + NBCU.LFFulfiller.Helper.txtEditor + '" readonly />' +
                        '<div class="calendar-edLF-fulfil-to-date" id="calendar-edLF-fulfil-to-date_' + NBCU.LFFulfiller.Helper.txtEditor + '"></div>' +
                    '</div>' +
                    '<div class="cols-4" style="float:left">' +
                        '<select type="text" class="selectbox textbox" id="edLF_LF_assitotime_textbox_' + NBCU.LFFulfiller.Helper.txtEditor + '">' +
                            '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                            '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                            '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                            '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="cols-2" style="float:left">' +
                        '<input type="text" class="edr-editor-textbox textbox" id="edLF_LF_assitosec_textbox_' + NBCU.LFFulfiller.Helper.txtEditor + '" maxlength="3" value="">' +
                        '</div>' +
                        '<span class="display-data" id="edLF_LF_assito_value_' + NBCU.LFFulfiller.Helper.txtEditor + '"></span>' +
                    '</div>' +
                '</div>' +
            '</div><div class="removebutton-container"><span class="button-remove-app button-remove-editor">remove</span></div>' +
        '</div>';
        $('.addbutton-container').before(btn_click_cntl);
        $(this).parent().parent().parent().parent().find('.display-data').hide();
        $('.button-remove-editor').show();
        datePickerLoad($('#edLF_LF_assifrom_textbox_' + NBCU.LFFulfiller.Helper.txtEditor), $('#calendar-edLF-fulfil-date_' + NBCU.LFFulfiller.Helper.txtEditor), $('#edLF_LF_assifrom_textbox_' + NBCU.LFFulfiller.Helper.txtEditor));
        datePickerLoad($('#edLF_LF_assito_textbox_' + NBCU.LFFulfiller.Helper.txtEditor), $('#calendar-edLF-fulfil-to-date_' + NBCU.LFFulfiller.Helper.txtEditor), $('#edLF_LF_assito_textbox_' + NBCU.LFFulfiller.Helper.txtEditor));
        initializePeoplePicker("edLF_editor_LF_assign_textbox_" + NBCU.LFFulfiller.Helper.txtEditor, false);
        $(this).parent().parent().parent().parent().find('.textbox').show();
    }

    this.removeEditor = function () {
        $(this).closest('.row').remove();
    }

    function appendAdditionalEditor(additionalEditorData) {
        if (additionalEditorData.length > 0) {
            $.each(additionalEditorData, function (index, new_obj) {
                NBCU.LFFulfiller.Helper.txtAdditionalEditor = index;
                if (index == 0) {
                    //var additionalEditors = new_obj['AdditionalEditors'] === null ? "" : new_obj['AdditionalEditors'];
                    //if (additionalEditors !== "") {
                    //    initializePeoplePickerControl("edLF_editor_LF_asst_textbox_0", new_obj['AdditionalEditors'], true);
                    //    $('#edLF_editor_LF_asst_value_0').text(additionalEditors);
                    //}
                    var assingnedEditor = new_obj['AsstAssigned'] === null ? "" : new_obj['AsstAssigned'];
                    if (assingnedEditor !== "") {
                        initializePeoplePickerControl("edLF_editor_LF_asst2_textbox_0", new_obj['AsstAssigned'], false);
                        $('#edLF_editor_LF_asst2_value_0').text(assingnedEditor);
                    }
                    else {
                        initializePeoplePicker("edLF_editor_LF_asst2_textbox_0", true);
                    }
                    $('#edLF_LF_asstfrom_textbox_0').val(new_obj['AssignedFromDate']);
                    $('#edLF_LF_asstfromTime_textbox_0').val(new_obj['AssignedFromTime']);
                    $('#edLF_LF_asstfromsec_textbox_0').val(new_obj['AssignedFromSec']);
                    $('#edLF_LF_asstto_textbox_0').val(new_obj['AssignedToDate']);
                    $('#edLF_ff_assttotime_textbox_0').val(new_obj['AssignedToTime']);
                    $('#edLF_ff_assttoec_textbox_0').val(new_obj['AssignedToSec']);
                    $('#edLF_LF_assifrom_value_0').show();
                    $('#edLF_LF_assito_value_0').show();
                }
                else {
                    var assignedFromDate = new_obj['AssignedFromDate'] === null ? "" : new_obj['AssignedFromDate'];
                    var assignedToDate = new_obj['AssignedToDate'] === null ? "" : new_obj['AssignedToDate'];
                    /**var btn_click_cntl = '<div class="additionalEditorrow"> <div class="row">' +
                        '<div class="cols cols-4 form-group">' +
                            '<label class="label label-display">Additional Editors:</label>' +
                            '<div class="display-dataform">' +
                                '<div id="edLF_editor_LF_asst_textbox_'+ index +'" class="textbox"></div>' +
                                '<span class="display-data" id="edLF_editor_LF_asst_value_' + index + '"></span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +**/
                    var btn_click_cntl = '<div class="additionalEditorrow"> <div class="row">' +
                        '<div class="cols cols-4 form-group">' +
                            '<label class="label label-display">Asst. Assigned:</label>' +
                            '<div class="display-dataform">' +
                                '<div id="edLF_editor_LF_asst2_textbox_' + index + '" class="textbox"></div>' +
                                '<span class="display-data" id="edLF_editor_LF_asst2_value_' + index + '"></span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cols cols-4 form-group">' +
                            '<div class="cols-12">' +
                                '<label class="label label-display">Assigned From:</label>' +
                                '<div class="display-dataform">' +
                                    '<div class="cols-6" style="float:left">' +
                                        '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_asstfrom_textbox_' + index + '" value="' + assignedFromDate + '" readonly />' +
                                        '<div class="calendar-edLF-fulfil-date" id="calendar-edLF-fulfil-asstfromdate_' + index + '"></div>' +
                                    '</div>' +
                                    '<div class="cols-4" style="float:left">' +
                                        '<select type="text" class="selectbox textbox" id="edLF_LF_asstfromTime_textbox_' + index + '">' +
                                            '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                                            '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                                            '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                                            '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="cols-2" style="float:left">' +
                                        '<input type="text" class="edr-editor-textbox textbox" id="edLF_LF_asstfromsec_textbox_' + index + '" maxlength="3" value="">' +
                                    '</div>' +
                                    '<span class="display-data" id="edLF_LF_asstfromsec_value_' + index + '"></span>' +
                                '</div>' +
                            '</div>' +
                       '</div>' +
                        '<div class="cols cols-4 form-group">' +
                            '<div class="cols-12">' +
                                '<label class="label label-display">Assigned To:</label>' +
                                '<div class="display-dataform">' +
                                    '<div class="cols-6" style="float:left">' +
                                        '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_asstto_textbox_' + index + '" value="' + assignedToDate + '" readonly />' +
                                        '<div class="calendar-edLF-fulfil-to-date" id="calendar-edLF-fulfil-asstto-date_' + index + '"></div>' +
                                    '</div>' +
                                    '<div class="cols-4" style="float:left">' +
                                        '<select type="text" class="selectbox textbox" id="edLF_ff_assttotime_textbox_' + index + '">' +
                                            '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                                            '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                                            '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                                            '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="cols-2" style="float:left">' +
                                        '<input type="text" class="edr-editor-textbox textbox" id="edLF_ff_assttoec_textbox_' + index + '" maxlength="3" value="">' +
                                    '</div>' +
                                    '<span class="display-data" id="edLF_ff_assttoec_value_' + index + '"></span>' +
                                '</div>' +
                            '</div>' +
                        '</div><div class="removebutton-container"><span class="button-remove-app button-remove-editor2">remove</span></div>' +
                    '</div></div>';

                    $('.addbutton-container2').before(btn_click_cntl);
                    //var additionalEditors = new_obj['AdditionalEditors'] === null ? "" : new_obj['AdditionalEditors'];
                    //if (additionalEditors !== "") {
                    //    initializePeoplePickerControl("edLF_editor_LF_asst_textbox_" + index, new_obj['AdditionalEditors'], true);
                    //    $('#edLF_editor_LF_asst_value_' + index).text(additionalEditors);
                    //}
                    //else {
                    //    initializePeoplePicker("edLF_editor_LF_asst_textbox_" + index, true);
                    //}
                    var assingnedEditor = new_obj['AsstAssigned'] === null ? "" : new_obj['AsstAssigned'];
                    if (assingnedEditor !== "") {
                        initializePeoplePickerControl("edLF_editor_LF_asst2_textbox_" + index, new_obj['AsstAssigned'], false);
                        $('#edLF_editor_LF_asst2_value_' + index).text(assingnedEditor);
                    }
                    else {
                        initializePeoplePicker("edLF_editor_LF_asst2_value_" + index, false);
                    }
                    $('#edLF_LF_asstfromTime_textbox_' + index).val(new_obj['AssignedFromTime'] === null ? "" : new_obj['AssignedFromTime']);
                    $('#edLF_LF_asstfromsec_textbox_' + index).val(new_obj['AssignedFromSec'] === null ? "" : new_obj['AssignedFromSec']);
                    datePickerLoad($('#edLF_LF_asstfrom_textbox_' + index), $('#calendar-edLF-fulfil-asstfromdate_' + index), $('#edLF_LF_asstfrom_textbox_' + index));
                    datePickerLoad($('#edLF_LF_asstto_textbox_' + index), $('#calendar-edLF-fulfil-asstto-date_' + index), $('#edLF_LF_asstto_textbox_' + index));
                    $('#edLF_ff_assttotime_textbox_' + index).val(new_obj['AssignedToTime'] === null ? "" : new_obj['AssignedToTime']);
                    $('#edLF_ff_assttoec_textbox_' + index).val(new_obj['AssignedToSec'] === null ? "" : new_obj['AssignedToSec']);
                }
            });
            updateAdditionalEditor();
            //$('.add-fullfillment-container .row-2').hide();
            $('.button-addeditior2').hide();
            $('.button-remove-editor2').hide();
        }
        else {
            $('.subpage-LF-fullfilment .textbox').show();
            $('.button-addeditior').show();
            $('.subpage-LF-fullfilment .display-data').hide();
            $('.subpage-LF-fullfilment .button-edit').text('save');
            $('.subpage-LF-fullfilment .button-edit').hide();
        }
    }

    this.addAdditionalEditor = function () {
        NBCU.LFFulfiller.Helper.txtAdditionalEditor++;
        $('.subpage-LF-fullfilment .button-edit').show();
        /** var btn_click_cntl = '<div class="additionalEditorrow"> <div class="row">' +
             '<div class="cols cols-4 form-group">' +
                 '<label class="label label-display">Additional Editors:</label>' +
                 '<div class="display-dataform">' +
                     '<div id="edLF_editor_LF_asst_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '" class="textbox"></div>' +
                     '<span class="display-data" id="edLF_editor_LF_asst_value_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '"></span>' +
                 '</div>' +
             '</div>' +
         '</div>' + **/
        var btn_click_cntl = '<div class="additionalEditorrow"> <div class="row">' +
            '<div class="cols cols-4 form-group">' +
                '<label class="label label-display">Asst. Assigned:</label>' +
                '<div class="display-dataform">' +
                    '<div id="edLF_editor_LF_asst2_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '" class="textbox"></div>' +
                    '<span class="display-data" id="edLF_editor_LF_asst2_value_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '"></span>' +
                '</div>' +
            '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<div class="cols-12">' +
                    '<label class="label label-display">Assigned From:</label>' +
                    '<div class="display-dataform">' +
                        '<div class="cols-6" style="float:left">' +
                            '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_asstfrom_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '" readonly />' +
                            '<div class="calendar-edLF-fulfil-date" id="calendar-edLF-fulfil-asstfromdate_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '"></div>' +
                        '</div>' +
                        '<div class="cols-4" style="float:left">' +
                            '<select type="text" class="selectbox textbox" id="edLF_LF_asstfromTime_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '">' +
                                '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                                '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                                '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                                '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="cols-2" style="float:left">' +
                            '<input type="text" class="edr-editor-textbox textbox" id="edLF_LF_asstfromsec_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '" maxlength="3" value="">' +
                        '</div>' +
                        '<span class="display-data" id="edLF_LF_asstfromsec_value_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '"></span>' +
                    '</div>' +
                '</div>' +
           '</div>' +
            '<div class="cols cols-4 form-group">' +
                '<div class="cols-12">' +
                    '<label class="label label-display">Assigned To:</label>' +
                    '<div class="display-dataform">' +
                        '<div class="cols-6" style="float:left">' +
                            '<input type="text" class="selectbox textbox datepicker-textbox" id="edLF_LF_asstto_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '" readonly />' +
                            '<div class="calendar-edLF-fulfil-to-date" id="calendar-edLF-fulfil-asstto-date_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '"></div>' +
                        '</div>' +
                        '<div class="cols-4" style="float:left">' +
                            '<select type="text" class="selectbox textbox" id="edLF_ff_assttotime_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '">' +
                                '<option></option><option>1 AM</option><option>2 AM</option><option>3 AM</option><option>4 AM</option><option>5 AM</option><option>6 AM</option>' +
                                '<option>7 AM</option><option>8 AM</option><option>9 AM</option><option>10 AM</option><option>11 AM</option><option>12 AM</option>' +
                                '<option>1 PM</option><option>2 PM</option><option>3 PM</option><option>4 PM</option><option>5 PM</option><option>6 PM</option>' +
                                '<option>7 PM</option><option>8 PM</option><option>9 PM</option><option>10 PM</option><option>11 PM</option><option>12 PM</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="cols-2" style="float:left">' +
                            '<input type="text" class="edr-editor-textbox textbox" id="edLF_ff_assttoec_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '" maxlength="3" value="">' +
                        '</div>' +
                        '<span class="display-data" id="edLF_ff_assttoec_value_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor + '"></span>' +
                    '</div>' +
                '</div>' +
            '</div><div class="removebutton-container"><span class="button-remove-app button-remove-editor2">remove</span></div>' +
        '</div></div>';
        $('.addbutton-container2').before(btn_click_cntl);
        $(this).parent().parent().parent().parent().find('.display-data').hide();
        $('.button-remove-editor').show();
        datePickerLoad($('#edLF_LF_asstfrom_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor), $('#calendar-edLF-fulfil-asstfromdate_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor), $('#edLF_LF_asstfrom_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor));
        datePickerLoad($('#edLF_LF_asstto_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor), $('#calendar-edLF-fulfil-asstto-date_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor), $('#edLF_LF_asstto_textbox_' + NBCU.LFFulfiller.Helper.txtAdditionalEditor));
        //initializePeoplePicker("edLF_editor_LF_asst_textbox_" + NBCU.LFFulfiller.Helper.txtAdditionalEditor, true);
        initializePeoplePicker("edLF_editor_LF_asst2_textbox_" + NBCU.LFFulfiller.Helper.txtAdditionalEditor, false);
        $(this).parent().parent().parent().parent().find('.textbox').show();

    }

    this.removeAdditionalEditor = function () {
        $(this).closest('.additionalEditorrow').remove();
    }

    function returnKeyProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.erLF_peoplePickerProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
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
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.erLF_SeniorProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += editRequestData.SeniorProducerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal
    }

    function returnKeyAssistantProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.erLF_peopleasst_proDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += editRequestData.AssistantProducerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal;
    }

    function collectNewCrewData() {
        NBCU.LFFulfiller.Helper.neweditRequestData = {};
        NBCU.LFFulfiller.Helper.neweditRequestData.Title = $('#erLF_Requester_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.RequestorName = $('#erLF_Requester_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.RequestorContact = $('#erLF_contact_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.RequestorEmail = $('#erLF_email_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.ProducerName = $('#erLF_Producer_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.SeniorProducer = $('#erLF_SeniorProducer_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.Slug = $('#erLF_summary_slugname_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.AirDate = $('#erLF_summary_txtairdate_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.AssistantProducer = $('#erLF_peopleasst_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.Business = $('#edLF_summary_business_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.ShowUnit = $('#edLF_summary_showunit_value_0').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.BudgetCode = $('#edLF_summary_budgetcode_value_0').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.AirDateTBD = editRequestData.AirDateTBD;
        NBCU.LFFulfiller.Helper.neweditRequestData.LocationofEdit = $('#edLF_summary_location_value').text();

        NBCU.LFFulfiller.Helper.neweditRequestData.PleceMinutes = $('#edLF-PieceMinutes').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PleceSeconds = $('#edLF-PieceSeconds').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PleceTBD = editRequestData.PleceTBD;
        NBCU.LFFulfiller.Helper.neweditRequestData.PleceVersions = $('#edLF_noofacts_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.CraftEditWeeks = $('#edLF_PieceDays_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.CraftEditDays = $('#edLF_PieceHrs_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.CraftEditHours = $('#edLF_PieceMin_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.EditStartDate = $('#edLF_craft_startdate_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.IsCrashEdit = editRequestData.IsCrashEdit;
        NBCU.LFFulfiller.Helper.neweditRequestData.NumberOfEditors = $('#edLF_noof_editor_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.DesktopEditShifts = $('#edLF_edittime_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.EsitmatedMove = $('#edLF_est_editroom_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.DateOfFirstScreening = $('#edLF_st_screen_value').text();
        NBCU.LFFulfiller.Helper.neweditRequestData.LFComments = $('#edLF_CraftEditComments_value').text();

        NBCU.LFFulfiller.Helper.neweditRequestData.PESpot = editRequestData.PESpot;
        NBCU.LFFulfiller.Helper.neweditRequestData.PERoughCut = editRequestData.PERoughCut;
        NBCU.LFFulfiller.Helper.neweditRequestData.PEWebPiece = editRequestData.PEWebPiece;
        NBCU.LFFulfiller.Helper.neweditRequestData.PEBrollTeases = editRequestData.PEBrollTeases;
        NBCU.LFFulfiller.Helper.neweditRequestData.PEAwards = editRequestData.PEAwards;
        NBCU.LFFulfiller.Helper.neweditRequestData.PEHours = $('#edLF_producer_PieceMinutes_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PEMinutes = $('#edLF-producer-PieceSeconds').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PETBD = editRequestData.PETBD;
        NBCU.LFFulfiller.Helper.neweditRequestData.PEEstProducerDays = $('#edLF_producer_crafttimedays_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PEEstProducerHours = $('#edLF_producer_crafttimehrs_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PEEstProducerMinutes = $('#edLF_producer_crafttimemin_textbox').val();

        NBCU.LFFulfiller.Helper.neweditRequestData.AEIngest = editRequestData.AEIngest;
        NBCU.LFFulfiller.Helper.neweditRequestData.AERadioCut = editRequestData.AERadioCut;
        NBCU.LFFulfiller.Helper.neweditRequestData.AEAdditionalElements = editRequestData.AEAdditionalElements;
        NBCU.LFFulfiller.Helper.neweditRequestData.AEOther = editRequestData.AEOther;
        NBCU.LFFulfiller.Helper.neweditRequestData.AEAssignmentType = editRequestData.AEAssignmentType;
        NBCU.LFFulfiller.Helper.neweditRequestData.AEAssignmentHours = editRequestData.AEAssignmentHours;
        NBCU.LFFulfiller.Helper.neweditRequestData.AEAssignmentMinutes = editRequestData.AEAssignmentMinutes;
        NBCU.LFFulfiller.Helper.neweditRequestData.AEAdditionalComments = $('#txtarea-additional-elemments').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.AROtherText = $('#txtarea-other-elemments').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.AEHours = $('#edLF_editor_PieceMinutes_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.AEMinutes = $('#edLF-editor-PieceSeconds').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.AETBD = editRequestData.AETBD;
        NBCU.LFFulfiller.Helper.neweditRequestData.AEEditorDays = $('#edLF_asst_timeneed_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.AEEditorHours = $('#edLF_asst_editortimehrs_textbox').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.AEDateNeeded = $('#erLF_editor_txtdate_value').text();

        NBCU.LFFulfiller.Helper.neweditRequestData.FFFulfillerComments = $('#edLF_LF_comments').val();

        NBCU.LFFulfiller.Helper.neweditRequestData.PECAssignedToHr = $('#edLF_acthrs_txtbx').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PECEditShiftRooms = $('#edLF_shtroom_chkbx').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PECEditShiftDesktops = $('#edLF_shftdsktp_txtbx').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PECFinalEditors = $('#edLF_fnledt_txtbx').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.PECAirDate = $('#edLF_finalairdate_txtbx').val();
        if (currentUser === $('#erLF_Requester_value').text() || currentUser === $('#erLF_Producer_value').text()) {
            NBCU.LFFulfiller.Helper.neweditRequestData.ERRequestStatus = 'Revised ';
        }
        else {
            NBCU.LFFulfiller.Helper.neweditRequestData.ERRequestStatus = 'Completed  ';
        }

        if ($('#edLF_postcut_producer_chkbx').is(':checked')) {
            NBCU.LFFulfiller.Helper.neweditRequestData.PECRoughCut = "Yes";
        }
        else {
            NBCU.LFFulfiller.Helper.neweditRequestData.PECRoughCut = "No";
        }
        if ($('#edLF_postcut_Asst_Editor_chkbx').is(':checked')) {
            NBCU.LFFulfiller.Helper.neweditRequestData.PECPiece = "Yes";
        }
        else {
            NBCU.LFFulfiller.Helper.neweditRequestData.PECPiece = "No";
        }
        if ($('#edLF_psotcomment_box').is(':checked')) {
            NBCU.LFFulfiller.Helper.neweditRequestData.PECPostEdition = "Yes";
        }
        else {
            NBCU.LFFulfiller.Helper.neweditRequestData.PECPostEdition = "No";
        }
        NBCU.LFFulfiller.Helper.neweditRequestData.PECPostEditComment = $('#edLF_postcomment').val();
        NBCU.LFFulfiller.Helper.neweditRequestData.producerKey = returnKeyProducer();
        NBCU.LFFulfiller.Helper.neweditRequestData.SeniorProducerKey = returnKeySeniorProducer();
        NBCU.LFFulfiller.Helper.neweditRequestData.AssistantProducerKey = returnKeyAssistantProducer();
    }

    /** Validate the field and data **/
    function getValidate() {
        validCheck = true;
        if ($('#erLF_Requester_value').text() == "" && $('#erLF_Requester_value').prev().val() == "") {
            $('#erLF_Requester_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#erLF_Requester_value').next().hide();
        }
        if ($('#erLF_Producer_value').text() == "" && $('#erLF_Producer_value').prev().val() == "") {
            $('#erLF_Producer_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#erLF_Producer_value').next().hide();
        }
        if ($('#erLF_SeniorProducer_value').text() == "" && $('#erLF_SeniorProducer_value').prev().val() == "") {
            $('#erLF_SeniorProducer_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#erLF_SeniorProducer_value').next().hide();
        }
        if ($('#erLF_summary_slugname_value').text() == "" && $('#erLF_summary_slugname_value').prev().val() == "") {
            $('#erLF_summary_slugname_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#erLF_summary_slugname_value').next().hide();
        }
        if ($('#edLF_summary_showunit_value_0').text() == "" && $('#edLF_summary_showunit_value_0').prev().val() == "") {
            $('#edLF_summary_showunit_value_0').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#edLF_summary_showunit_value_0').next().hide();
        }

        if ($('#edLF_summary_location_value').text() == "" && $('#edLF_summary_location_value').prev().val() == "") {
            $('#edLF_summary_location_value').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#edLF_summary_location_value').next().hide();
        }

        $.each($("#LongformRequest-fulfiller .button-edit"), function (ind, val) {
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

        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && NBCU.LFFulfiller.Helper.staticEditRequestID != "") {
            collectNewCrewData();
            NBCU.LFFulfiller.Helper.neweditRequestData.__metadata = { 'type': 'SP.Data.EditRequestListItem' }
            NBCU.LFFulfiller.Helper.updateItem(NBCU.LFFulfiller.Helper.neweditRequestData, 'EditRequest', NBCU.LFFulfiller.Helper.staticEditRequestID);


            NBCU.LFFulfiller.Helper.checkRemove('Editor', NBCU.LFFulfiller.Helper.staticEditRequestID, 'EditorRequestID');
            $.each($("input[id^='edLF_LF_assifrom_textbox_']"), function (ind, val) {
                var showEditorIndex = val.id.split("_")[4];
                var editorName = $('#edLF_editor_LF_assign_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text() === null ? "" : $('#edLF_editor_LF_assign_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim();
                if (editorName !== "") {
                    editor_data = {
                        __metadata: { 'type': 'SP.Data.EditorListItem' },
                        Title: editorName,
                        EditorAssigned: editorName,
                        AssignedFromDate: $('#edLF_LF_assifrom_textbox_' + showEditorIndex).val(),
                        AssignedFromTime: $('#edLF_LF_assifromTime_textbox_' + showEditorIndex).val(),
                        AssignedFromSec: $('#edLF_LF_assifromsec_textbox_' + showEditorIndex).val(),
                        AssignedToDate: $('#edLF_LF_assito_textbox_' + showEditorIndex).val(),
                        AssignedToTime: $('#edLF_LF_assitotime_textbox_' + showEditorIndex).val(),
                        AssignedToSec: $('#edLF_LF_assitosec_textbox_' + showEditorIndex).val(),
                        EditorRequestID: NBCU.LFFulfiller.Helper.staticEditRequestID.toString()
                    };
                    NBCU.LFFulfiller.Helper.addItem(editor_data, 'Editor');
                }
            });

            NBCU.LFFulfiller.Helper.checkRemove('AdditionalEditor', NBCU.LFFulfiller.Helper.staticEditRequestID, 'EditorRequestID');
            $.each($("input[id^='edLF_LF_asstfrom_textbox_']"), function (ind, val) {
                var showEditorIndex = val.id.split("_")[4];
                //var editorName = $('#edLF_editor_LF_asst_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text() === null ? "" : $('#edLF_editor_LF_asst_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim();
                var editorAssigned = $('#edLF_editor_LF_asst2_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text() === null ? "" : $('#edLF_editor_LF_asst2_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim();
                if (editorAssigned !== "") {

                    //var additional_Editors = '';
                    //if ($('#edLF_editor_LF_asst_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').length > 1) {
                    //    $.each($('#edLF_editor_LF_asst_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved'), function (ind, val) {
                    //        if (ind == $('#edLF_editor_LF_asst_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').length - 1) {
                    //            additional_Editors = additional_Editors + $(val).text();
                    //        }
                    //        else {
                    //            additional_Editors = additional_Editors + $(val).text() + " | ";
                    //        }
                    //    });
                    //}
                    //else {
                    //    additional_Editors = editorName;
                    //}

                    editor_data = {
                        __metadata: { 'type': 'SP.Data.AdditionalEditorListItem' },
                        Title: editorAssigned,
                        //AdditionalEditors: additional_Editors,
                        AsstAssigned: editorAssigned,
                        AssignedFromDate: $('#edLF_LF_asstfrom_textbox_' + showEditorIndex).val(),
                        AssignedFromTime: $('#edLF_LF_asstfromTime_textbox_' + showEditorIndex).val(),
                        AssignedFromSec: $('#edLF_LF_asstfromsec_textbox_' + showEditorIndex).val(),
                        AssignedToDate: $('#edLF_LF_asstto_textbox_' + showEditorIndex).val(),
                        AssignedToTime: $('#edLF_ff_assttotime_textbox_' + showEditorIndex).val(),
                        AssignedToSec: $('#edLF_ff_assttoec_textbox_' + showEditorIndex).val(),
                        EditorRequestID: NBCU.LFFulfiller.Helper.staticEditRequestID.toString()
                    };
                    NBCU.LFFulfiller.Helper.addItem(editor_data, 'AdditionalEditor');
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
            if ($('.valid-msg-error:visible').length !== 0) {
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

            if ($('.sp-peoplepicker-errorMsg:visible').length !== 0) {
                $.each($('.sp-peoplepicker-errorMsg:visible'), function (ind, val) {
                    $(val).parent('div')[0].scrollIntoView(true);
                    return false;
                });
            }
        }

        event.stopPropagation();
    };

    function updateEditor() {
        $.each($("input[id^='edLF_LF_assifrom_textbox_']"), function (ind, val) {
            var showEditorIndex = val.id.split("_")[4];
            var assfromSec = $('#edLF_LF_assifromsec_textbox_' + showEditorIndex).val();
            var asstoSec = $('#edLF_LF_assitosec_textbox_' + showEditorIndex).val();
            var getFromSec = assfromSec !== "" ? (assfromSec + ((assfromSec === '0' || assfromSec === '00' || assfromSec === '000' || assfromSec === '1' | assfromSec === '01' || assfromSec === '001') ? ' second' : ' seconds')) : assfromSec;
            var getToSec = asstoSec !== "" ? (asstoSec + ((asstoSec === '0' || asstoSec === '00' || asstoSec === '000' || asstoSec === '1' | asstoSec === '01' || asstoSec === '001') ? ' second' : ' seconds')) : asstoSec;
            $('#edLF_editor_LF_assign_value_' + showEditorIndex).text($('#edLF_editor_LF_assign_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim());
            $('#edLF_LF_assifrom_value_' + showEditorIndex).text($('#edLF_LF_assifrom_textbox_' + showEditorIndex).val() + ' ' + $('#edLF_LF_assifromTime_textbox_' + showEditorIndex).val() + ' ' + getFromSec);
            $('#edLF_LF_assito_value_' + showEditorIndex).text($('#edLF_LF_assito_textbox_' + showEditorIndex).val() + ' ' + $('#edLF_LF_assitotime_textbox_' + showEditorIndex).val() + ' ' + getToSec);
        });
    }

    function updateAdditionalEditor() {
        $.each($("input[id^='edLF_LF_asstfrom_textbox_']"), function (ind, val) {
            var showEditorIndex = val.id.split("_")[4];
            var assfromSec = $('#edLF_LF_asstfromsec_textbox_' + showEditorIndex).val();
            var asstoSec = $('#edLF_ff_assttoec_textbox_' + showEditorIndex).val();
            var getFromSec = assfromSec !== "" ? (assfromSec + ((assfromSec === '0' || assfromSec === '00' || assfromSec === '000' || assfromSec === '1' | assfromSec === '01' || assfromSec === '001') ? ' second' : ' seconds')) : assfromSec;
            var getToSec = asstoSec !== "" ? (asstoSec + ((asstoSec === '0' || asstoSec === '00' || asstoSec === '000' || asstoSec === '1' | asstoSec === '01' || asstoSec === '001') ? ' second' : ' seconds')) : asstoSec;
            //$('#edLF_editor_LF_asst_value_' + showEditorIndex).text($('#edLF_editor_LF_asst_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim());
            $('#edLF_editor_LF_asst2_value_' + showEditorIndex).text($('#edLF_editor_LF_asst2_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim());
            $('#edLF_LF_asstfromsec_value_' + showEditorIndex).text($('#edLF_LF_asstfrom_textbox_' + showEditorIndex).val() + ' ' + $('#edLF_LF_asstfromTime_textbox_' + showEditorIndex).val() + ' ' + getFromSec);
            $('#edLF_ff_assttoec_value_' + showEditorIndex).text($('#edLF_LF_asstto_textbox_' + showEditorIndex).val() + ' ' + $('#edLF_ff_assttotime_textbox_' + showEditorIndex).val() + ' ' + getToSec);
        });
    }

    this.EditItems = function (event) {
        var ctrlTitle = $(this).attr('title');
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.box-edLF-producer-produer').show();
            $(this).parent().parent().find('.form-edLF-LNGF-AssEditor-Edit').show();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('.icon-datepicker').css('display', 'inline-block');
            $(this).parent().parent().find('select').show();
            $(this).parent().parent().find('select').show();
            $('.calendar-edrf-summary-airdate').show();
            $('.calender-conatainer-edrf-craft').show();
            $('.calendar-erLF-editor-date').show();
            $('.calender-conatainer-st-screen').show()
            $('.calender-conatainer-est-editroom').show();
            if ($(".form-edr-craft-producer").is(":visible") == true) {
                $('#ERProducerEditPage').css('padding-top', '10px');
            }
            if (ctrlTitle === "Fulfillment") {
                $('.button-addeditior').show();
                $('.button-remove-editor').show();
                $('.button-addeditior2').show();
                $('.button-remove-editor2').show();
                $(this).parent().parent().find('.cols-2').show();
            }
        }
        else {
            var errorShown = $("#LFFullfilmentPage .sp-peoplepicker-errorMsg").is(":visible");
            if (!errorShown) {
                $(this).text("edit");
                $(this).parent().parent().find('.display-data').each(function (ind, val) {
                    $(this).show()
                    $(this).text($(this).prev().val());
                    $(this).prev().hide();
                });
                $('#erLF_Requester_value').text($('#erLF_peoplePickerRequesterDiv span.ms-entity-resolved').text());
                $('#erLF_Producer_value').text($('#erLF_peoplePickerProducerDiv span.ms-entity-resolved').text());
                $('#erLF_SeniorProducer_value').text($('#erLF_SeniorProducerDiv span.ms-entity-resolved').text());
                $('#erLF_peopleasst_value').text($('#erLF_peopleasst_proDiv span.ms-entity-resolved').text());
                if ($(".form-edr-craft-producer").is(":visible") == false) {
                    $('#ERProducerEditPage').css('padding-top', '');
                }
                if (ctrlTitle === "Fulfillment") {
                    updateEditor();
                    updateAdditionalEditor();
                    $(this).parent().parent().find('.textbox').hide();
                    $('.button-remove-editor').hide();
                    $('.button-addeditior').hide();
                    $('.button-addeditior2').hide();
                    $('.button-remove-editor2').hide();
                }
            }
        }
        if (!errorShown) {
            var page = $(this).attr('title').trim();
            switch (page) {
                case editPage.LFSummaryEditPage:
                    NBCU.LFFulfiller.Summary.PostBack = false;
                    summary_page = new NBCU.LFFulfiller.Summary();
                    summary_page.editRequestData = editRequestData;
                    summary_page.showUnitData = showUnitData;
                    summary_page.editRequestShowUnitData = editRequestShowUnitData;
                    summary_page.Init();
                    break;
                case editPage.LFcraftEditPage:
                    NBCU.LFFulfiller.Craft.PostBack = false;
                    craft_page = new NBCU.LFFulfiller.Craft();
                    craft_page.editRequestData = editRequestData;
                    craft_page.Init();
                    break;
                case editPage.LFProducerEditPage:
                    NBCU.LFFulfiller.Producer.PostBack = false;
                    producer_page = new NBCU.LFFulfiller.Producer();
                    producer_page.editRequestData = editRequestData;
                    producer_page.Init();
                    break;
                case editPage.LFAssistantEditorEditPage:
                    NBCU.LFFulfiller.ASEditor.PostBack = false;
                    editor_page = new NBCU.LFFulfiller.ASEditor();
                    editor_page.editRequestData = editRequestData;
                    editor_page.Init();
                    break;
                default:
                    break;
            }
            event.stopPropagation();
        }
    };

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

    function initializePeoplePickerControl(peoplePickerElementId, displayValue, AllowMultipleValues) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = AllowMultipleValues;
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

    function appendLocation(locationData) {
        $('#edLF_summary_location').find('option:not(:first)').remove();
        $.each(locationData, function (index, data) {
            $('#edLF_summary_location').append('<option id="' + data.ID + '">' + data.Title + '</option>');
        });
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
        //var phoneNo = personProperties.get_userProfileProperties()['CellPhone'];
        var deskNo = personProperties.get_userProfileProperties()['WorkPhone'];
        var email = personProperties.get_userProfileProperties()['WorkEmail'];
        //alert(email);
        $('#edLF_contact_textbox').val(deskNo);
        $('#erLF_contact_value').text(deskNo);
        $('#erLF_email_textbox').val(email);
        $('#erLF_email_value').text(email);

        var peoplePickerId = 'erLF_peoplePickerRequesterDiv';
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
        NBCU.LFFulfiller.Helper.staticEditRequestID = getUrlVars()["CRID"];
        editRequestData = NBCU.LFFulfiller.Helper.ReadList("/sites/NMWF", "EditRequest", NBCU.LFFulfiller.Helper.staticEditRequestID);
        editorData = NBCU.LFFulfiller.Helper.ReadListData("/sites/NMWF", "Editor", "?$select=ID, EditorAssigned,Room,AssignedFromDate,AssignedFromTime,AssignedFromSec,AssignedToDate,AssignedToTime, AssignedToSec&$filter=EditorRequestID eq '" + NBCU.LFFulfiller.Helper.staticEditRequestID + "'");
        additionalEditorData = NBCU.LFFulfiller.Helper.ReadListData("/sites/NMWF", "AdditionalEditor", "?$select=ID, AdditionalEditors,AsstAssigned,AssignedFromDate,AssignedToDate,EditorRequestID,AssignedFromTime,AssignedFromSec,AssignedToTime,AssignedToSec&$filter=EditorRequestID eq '" + NBCU.LFFulfiller.Helper.staticEditRequestID + "'");
        editRequestShowUnitData = NBCU.LFFulfiller.Helper.ReadListData("/sites/NMWF", "ER_ShowUnit", "?$select=ID,Title,AssignedBudgetCode,ShowUnitID&$filter=RequestID eq '" + NBCU.LFFulfiller.Helper.staticEditRequestID + "'");
        roomData = NBCU.LFFulfiller.Helper.ReadListData("/sites/NMWF", "Room", "?$select=ID,Title,Facilities1");
        showUnitData = NBCU.LFFulfiller.Helper.ReadListData("/sites/NMWF", "ShowUnit", "?$select=ShowUnitTitle,DefaultBudgetCode,ID,Business");
        locationData = NBCU.LFFulfiller.Helper.ReadListData("", "LocationOfEdit", "?select=Title,ID");

        $(document).on("click", ".button-edit", EditItems);
        $(document).on("click", ".button-addeditior", addEditor);
        $(document).on("click", ".button-addeditior2", addAdditionalEditor)
        $(document).on("click", ".button-remove-editor", removeEditor);
        $(document).on("click", ".button-remove-editor2", removeAdditionalEditor);
        $('#btn-submit').unbind('click');
        $('#btn-submit').bind('click', SaveItem);

        initializePeoplePicker('erLF_peoplePickerRequesterDiv', false);
        initializePeoplePicker('erLF_peoplePickerProducerDiv', false);
        initializePeoplePicker('erLF_SeniorProducerDiv', false);
        initializePeoplePicker("erLF_peopleasst_proDiv", false);
        initializePeoplePicker("edLF_editor_LF_assign_textbox_0", false);
        //initializePeoplePicker("edLF_editor_LF_asst_textbox_0", true);
        initializePeoplePicker("edLF_editor_LF_asst2_textbox_0", false);
        $('#edLF_editor_LF_assign_value_0').hide();
        $('#edLF_LF_assifrom_value_0').hide();
        $('#edLF_LF_assito_value_0').hide();


        appendRoom(roomData, '#edrf_ff_room_textbox_0');
        addShowUnit(editRequestShowUnitData);
        appendEditor(editorData);
        appendAdditionalEditor(additionalEditorData);
        appendLocation(locationData);
        FillData();
        $('#er-header-showimg').text(editRequestData.ShowUnit == null ? "" : editRequestData.ShowUnit);

        initializePeoplePickerControl('erLF_peoplePickerRequesterDiv', $('#erLF_Requester_value').text(), false);
        SPClientPeoplePicker.SPClientPeoplePickerDict.erLF_peoplePickerRequesterDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#edLF_contact_textbox').val("");
                $('#erLF_contact_value').text("");
                $('#erLF_email_textbox').val("");
                $('#erLF_email_value').text("");
            }
        };

        initializePeoplePickerControl('erLF_peoplePickerProducerDiv', $('#erLF_Producer_value').text(), false);
        initializePeoplePickerControl('erLF_SeniorProducerDiv', $('#erLF_SeniorProducer_value').text(), false);
        initializePeoplePickerControl('erLF_peopleasst_proDiv', $('#erLF_peopleasst_value').text(), false);

        //Edit Summary
        datePickerLoad($('#erLF-summary-airdate'), '.calendar-erLF-summary-airdate', $('#erLF_summary_txtairdate_textbox'));
        //Edit Craft
        datePickerLoad($('#edLF-craft-start-date'), '.calender-conatainer-edLF-craft', $('#edLF_craft_startdate_textbox'));
        //Assigned from
        datePickerLoad($('#edLF-est-editroom-start-date'), '.calender-conatainer-est-editroom', $('#edLf-est-editroom'));
        //Assigned to
        datePickerLoad($('#edLF-st-screen-start-date'), '.calender-conatainer-st-screen', $('#edLf-st-screen'));
        //Post air final
        datePickerLoad($('#erLF-editor-date'), '.calendar-erLF-editor-date', $('#erLF_editor_txtdate_textbox'));
        ////Assigned from
        datePickerLoad($('#edLF_LF_assifrom_textbox_0'), $('#calendar-edLF-fulfil-date_0'), $('#edLF_LF_assifrom_textbox_0'));
        ////Assigned to
        datePickerLoad($('#edLF_LF_assito_textbox_0'), $('#calendar-edLF-fulfil-to-date_0'), $('#edLF_LF_assito_textbox_0'));
        ////Assigned from
        datePickerLoad($('#edLF_LF_asstfrom_textbox_0'), $('#calendar-edLF-fulfil-asstfromdate_0'), $('#edLF_LF_asstfrom_textbox_0'));
        ////Assigned to
        datePickerLoad($('#edLF_LF_asstto_textbox_0'), $('#calendar-edLF-fulfil-asstto-date_0'), $('#edLF_LF_asstto_textbox_0'));
        ////Final Air date
        datePickerLoad($('#edLF_finalairdate_txtbx'), $('#calendar-edLF_finalairdate'), $('#edLF_finalairdate_txtbx'));

        GetCurrentUser();
        $('.button-remove-showunit').hide();
        $('.button-addsu').hide();

        $('#er-header-slug').text($('#erLF_summary_slugname_value').text());
        $('#er-header-startdate').text($('#edLF_craft_startdate_value').text() !== "" ? $('#edLF_craft_startdate_value').text() : 'TBD');

        //$("input[class='form-edLF-LNGF-AssEditor-Edit']").change(function () {
        //    if ($(this).next().text() == "Additional Elements") {
        //        if ($(this).is(":checked")) {
        //            $("input[class='form-edLF-LNGF-AssEditor-Edit']").prop('checked', true);
        //            $('#txtarea-additional-elemments').val('');
        //            $('#txtarea-additional-elemments').show();
        //        }
        //        else {
        //            $('#txtarea-additional-elemments').val('');
        //            $('#txtarea-additional-elemments').hide();
        //        }
        //    }
        //});

        $('.edr-LNGF-AssEditor-additionalelement').change(function () {
            if ($(this).is(":checked")) {
                $('.edr-LNGF-AssEditor-additionalelement').prop('checked', true);
                $('.show-LF-lngf-checkbox-assignment').show();
                //$('#txtarea-additional-elemments').addClass('active');
            }
            else {
                //$('#txtarea-additional-elemments').removeClass('active');
                $('#txtarea-additional-elemments').val('');
                $('.show-LF-lngf-checkbox-assignment').hide();
            }
        });

        $('.edr-LNGF-AssEditor-other').change(function () {
            if ($(this).is(":checked")) {
                $('.edr-LNGF-AssEditor-other').prop('checked', true);
                $('.show-LF-lngf-checkbox-assignment-other').show();
                //$('#txtarea-additional-elemments').addClass('active');
            }
            else {
                //$('#txtarea-additional-elemments').removeClass('active');
                $('#txtarea-other-elemments').val('');
                $('.show-LF-lngf-checkbox-assignment-other').hide();
            }
        });

        $('.edr-LNGF-AssEditor-checkbox').change(function () {
            if ($(this).is(":checked")) {
                $('.edr-LNGF-AssEditor-checkbox').prop('checked', true);
                $('.LNGF-AssEditor-editor-show').show();
            }
            else {
                $('.LNGF-AssEditor-editor-show').hide();
                $('#LNGF-FileTape').val('No');
                $('#LNGF-IngestHours').val('');
                $('#LNGF-IngestMinutes').val('');
            }
        });

        $('#LNGF-FileTape').change(function () {
            if ($(this).val() == "File") {
                $('.newFileIngest').show();
            }
            else {
                $('.newFileIngest').hide();
            }
        })
        ///**Request status button click event **/
        //$('.display-fullwidth .button').click(function () {
        //    $('.display-fullwidth .button').removeClass('active');
        //    $(this).addClass('active');
        //});

        $("#edLF_producer_crafttimedays_textbox, #edLF_producer_crafttimehrs_textbox, #edLF_producer_crafttimemin_textbox, .edLF-producer-textbox, #edLF-noofacts-textbox, #edLF_PieceDays_textbox, #edLF_PieceHrs_textbox, #edLF_PieceMin_textbox, #edLF-noof-editor, #edLF-IsCrashEdit, #edLF-PieceMinutes, #edLF-PieceSeconds, #edrf_PieceMin_textbox, #edLF_producer_PieceMinutes_textbox, #edLF-producer-PieceSeconds, #edLF_editor_PieceMinutes_textbox, #edLF-editor-PieceSeconds, #edLF_asst_timeneed_textbox, #edLF_asst_editortimehrs_textbox").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
            var ctrlID = $(this).attr('id');
            if (ctrlID === 'edLF-PieceMinutes' || ctrlID === 'edLF-PieceSeconds') {
                $('#edLF-Piecetbd').attr('checked', false);
                $('#edLF_tbd_value').text('No');
            }
            if (ctrlID === 'edLF_producer_PieceMinutes_textbox' || ctrlID === 'edLF-producer-PieceSeconds') {
                $('#edLF_producer_Piecetbd_textbox').attr('checked', false);
                $('#edLF_producer_Piecetbd_value').text('No');
            }
            if (ctrlID === 'edLF_editor_PieceMinutes_textbox' || ctrlID === 'edLF-editor-PieceSeconds') {
                $('#edLF_editor_Piecetbd_textbox').attr('checked', false);
                $('#edLF_editor_Piecetbd_value').text('No');
            }
        });

        $("#edr-howmany-textbox, #edrf_PieceDays_textbox, #edrf_confirm_brolls, #edr_producer_crafttimedays_textbox, #edLF_acthrs_txtbx, #edLF_shtroom_chkbx, #edLF_shftdsktp_txtbx, #edLF_fnledt_txtbx, #LNGF-IngestHours,#LNGF-IngestMinutes").keydown(function () {
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
        });

        $(document).on("keydown", "input:text[id^='edLF_LF_assifromsec_textbox_'], input:text[id^='edLF_LF_assitosec_textbox_0'], input:text[id^='edLF_ff_assttoec_textbox_'], input:text[id^='edLF_LF_asstfromsec_textbox_']", function (e) {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
        });

        $("#edLF_contact_textbox").keydown(function () {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });
        $('#erLF-editor-date').hide();

        $('#edLF-Piecetbd').change(function () {
            if ($(this).is(":checked")) {
                $('#edLF_tbd_value').text('No');
                $('#edLF-PieceMinutes').val('');
                $('#edLF-PieceSeconds').val('');
                $('#edLF_length_time_value').text('');
            }
        });

        $('#edLF_producer_Piecetbd_textbox').change(function () {
            if ($(this).is(":checked")) {
                $('#edLF_producer_Piecetbd_value').text('No');
                $('#edLF_producer_PieceMinutes_textbox').val('');
                $('#edLF-producer-PieceSeconds').val('');
                $('#edLF_producer_PieceMinutes_value').text('');
            }
        });

        $('#edLF_editor_Piecetbd_textbox').change(function () {
            if ($(this).is(":checked")) {
                $('#edLF_editor_Piecetbd_value').text('No');
                $('#edLF_editor_PieceMinutes_textbox').val('');
                $('#edLF-editor-PieceSeconds').val('');
                $('#edLF_editor_PieceMinutes_value').text('');
            }
        });

        $('#edLF-summarybd').change(function () {
            if ($(this).is(":checked")) {
                $('#edLF_summary_tbd_value').text('Yes');
                $('#erLF_summary_txtairdate_textbox').val('');
                $('#erLF-summary-airdate').text('');
            }
        });

        $('#erLF-summary-airdate').click(function () {
            $('#edLF_summary_tbd_value').text('No');
            $('#edLF-summarybd').prop('checked', false);
        });


        $(document).on("focusout", "input:text[id^='edrf_email_textbox']", ValidateEmail);

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
            $('#edLF-header-status').text(editRequestData.ERRequestStatus);
            $('#edLF-header-status').removeClass().addClass('button').addClass('button-' + editRequestData.ERRequestStatus.toLowerCase()).addClass('active');
        }
        else {
            $('#er-header-shootstatus').text('New');
            $('#edLF-header-status').text('New');
            $('#edLF-header-status').removeClass().addClass('button').addClass('button-booked').addClass('active-New');
        }

        //var currentDate = new Date()
        //var currentHr = currentDate.getHours().length > 1 ? currentDate.getHours() : '0' + currentDate.getHours();
        //var currentMin = currentDate.getMinutes().toString().length > 1 ? currentDate.getMinutes() : '0' + currentDate.getMinutes();
        //var getCurrentTime = NBCU.CrewRequest.Helper.tConvert(currentHr + ":" + currentMin);

        //currentDate = NBCU.LFFulfiller.Helper.date_Parse(currentDate) + " " + getCurrentTime;
        //if (currentUser.indexOf('(') !== -1) {
        //    currentUser = currentUser.slice(0, currentUser.indexOf('('));
        //}

        //var str = $('#footer2').text();
        //str = NBCU.Fulfiller.Helper.stringFormat(str, [currentDate, currentUser]);
        //$('#footer2').text(str);
    }

    return {
        Init: init,
        EditItems: this.EditItems,
        EditResource: this.EditResource,
        FillData: this.FillData
    }

}();
$(document).ready(NBCU.LFFulfiller.Master.Init);