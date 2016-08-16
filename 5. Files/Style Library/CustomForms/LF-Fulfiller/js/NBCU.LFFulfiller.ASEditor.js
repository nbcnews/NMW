NBCU.LFFulfiller.ASEditor = function () {
    var validCheck = true;
    this.productionTypeData = [];
    this.talentData = [];
    this.storyData = [];
    this.showUnitData = [];
    this.editRequestData;
    this.crt_TalentData = [];
    this.crt_ShowUnitData = [];
    this.crt_ShootData = [];

    this.editorEditItems = function (event) {
        var validCheck = getValidate();
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.form-edLF-LNGF-AssEditor-Edit').show();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('.icon-datepicker').show();
            $(this).parent().parent().find('.calendar-erLF-editor-date').show();
        }
        else {
            if (validCheck) {
                $(this).text("edit");
                $(this).parent().parent().find('.display-data').each(function (ind, val) {
                    var ctrlID = $(this).attr('id');
                    $(this).show()
                    $(this).text($(this).prev().val());
                    $(this).prev().hide();
                    if (ctrlID === 'erLF_editor_txtdate_value') {
                        $(this).prev().prev().hide();
                        $(this).prev().prev().prev().hide();
                        $(this).text($(this).prev().prev().prev().val());
                    }
                });
                editorSectionSave();
            }
        }
        event.stopPropagation();
    }

    function editorSectionSave() {
        var editorRequirements = [];
        if ($('#checkbox-Ingest').is(':checked')) {
            editRequestData.AEIngest = "Yes";
            editRequestData.AEAssignmentType = $('#LNGF-FileTape').val();
            editRequestData.AEAssignmentHours = $('#LNGF-IngestHours').val();
            editRequestData.AEAssignmentMinutes = $('#LNGF-IngestMinutes').val();
            $('.LNGF-AssEditor-editor-show').show();
            editorRequirements.push('Ingest');
        }
        else {
            delete editorRequirements['Ingest'];
            editRequestData.AEIngest = "No";
            $('#LNGF-FileTape').val('No');
            $('#LNGF-IngestHours').val('');
            $('#LNGF-IngestMinutes').val('');
            editRequestData.AEAssignmentType = $('#LNGF-FileTape').val();
            editRequestData.AEAssignmentHours = $('#LNGF-IngestHours').val();
            editRequestData.AEAssignmentMinutes = $('#LNGF-IngestMinutes').val();
            $('.LNGF-AssEditor-editor-show').hide();
        }
        if ($('.edr-LNGF-AssEditor-RadioCut').is(':checked')) {
            editorRequirements.push('Radio Cut');
            editRequestData.AERadioCut = "Yes";
        }
        else {
            delete editorRequirements['Radio Cut'];
            editRequestData.AERadioCut = "No";
        }
        if ($('.edr-LNGF-AssEditor-additionalelement').is(':checked')) {
            editorRequirements.push($('#txtarea-additional-elemments').val());
            editRequestData.AEAdditionalElements = "Yes";
            editRequestData.AEAdditionalComments = $('#txtarea-additional-elemments').val();
        }
        else {
            delete editorRequirements[$('#txtarea-additional-elemments').val()];
            editRequestData.AEAdditionalElements = "No";
        }
        if ($('.edr-LNGF-AssEditor-other').is(':checked')) {
            editorRequirements.push($('#txtarea-other-elemments').val());
            editRequestData.AEOther = "Yes";
            editRequestData.AROtherText = $('#txtarea-other-elemments').val();
        }
        else {
            delete editorRequirements[$('#txtarea-other-elemments').val()];
            editRequestData.AEOther = "No";
        }
        
        $('#edLF_assignment_value').text(editorRequirements.join(', '));

        var piectMinuteValue = '';
        if ($('#edLF_editor_Piecetbd_textbox').is(':checked')) {
            $('#edLF_editor_Piecetbd_value').text('Yes');
            editRequestData.AETBD = 'Yes';
        }
        else {
            $('#edLF_editor_Piecetbd_value').text('No');
            editRequestData.AETBD = 'No';
            var pieceMin = $('#edLF_editor_PieceMinutes_textbox').val().trim();
            var pieceSec = $('#edLF-editor-PieceSeconds').val().trim();

            if (pieceMin !== '') {
                piectMinuteValue = piectMinuteValue + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' hour ' : ' hours ');
            }
            if (pieceSec !== '') {
                piectMinuteValue = piectMinuteValue + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' minute ' : ' minutes ');
            }
        }

        $('#edLF_editor_PieceMinutes_value').text(piectMinuteValue);


        var pieceDays = $('#edLF_asst_timeneed_textbox').val().trim();
        var pieceHrs = $('#edLF_asst_editortimehrs_textbox').val().trim();

        var producerEditTime = '';
        if (pieceDays !== '') {
            producerEditTime = producerEditTime + pieceDays + ((pieceDays === '0' || pieceDays === '00' || pieceDays === '000' || pieceDays === '1' || pieceDays === '01' || pieceDays === '001') ? ' day ' : ' days ');
        }
        if (pieceHrs !== '') {
            producerEditTime = producerEditTime + pieceHrs + ((pieceHrs === '0' || pieceHrs === '00' || pieceHrs === '000' || pieceHrs === '1' || pieceHrs === '01' || pieceHrs === '001') ? ' hour ' : ' hours ');
        }

        $('#edLF_asst_timeneed_value').text(producerEditTime);

        $('#erLF_editor_txtdate_value').text($('#edrf_craft_startdate_value').prev().prev().prev().val());
        $('#erLF_editor_txtdate_value').prev().prev().hide();
        $('#erLF_editor_txtdate_value').prev().prev().prev().hide();
    }

    function getValidate() {
        validCheck = true;
        if ($('.edr-LNGF-AssEditor-additionalelement').is(':checked') && $('#txtarea-other-elemments').val() === "") {
            $('#txtarea-additional-elemments').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#txtarea-additional-elemments').next().hide();
        }
        if ($('.edr-LNGF-AssEditor-other').is(':checked') && $('#txtarea-other-elemments').val() === "") {
            $('#txtarea-other-elemments').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#txtarea-other-elemments').next().hide();
        }

        return validCheck;
    };

    this.Init = function () {
        $(".button-edit").off("click");
        $("#LFSummaryEditPage .button-edit").off("click");
        $("#LFcraftEditPage .button-edit").off("click");
        $("#LFProducerEditPage .button-edit").off("click");
        $("#LFAssistantEditorEditPage .button-edit").off("click");
       
        editRequestData = this.editRequestData;

        $('#LFAssistantEditorEditPage .button-edit').bind('click', this.editorEditItems);
        if ($('#LFAssistantEditorEditPage .button-edit').text() == "edit") {
            editorSectionSave();
        }
    }
};
NBCU.LFFulfiller.ASEditor.prototype.PostBack = false;