NBCU.LFFulfiller.Producer = function () {
    var validCheck = true;
    this.productionTypeData = [];
    this.talentData = [];
    this.storyData = [];
    this.showUnitData = [];
    this.editRequestData;
    this.crt_TalentData = [];
    this.crt_ShowUnitData = [];
    this.crt_ShootData = [];

    this.ProducerEditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.box-edLF-producer-produer').show();
            $(this).parent().parent().find('.textbox').show();
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                var ctrlID = $(this).attr('id');
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
            });
            producerSectionSave();
        }
        event.stopPropagation();
    }

    function producerSectionSave() {
        var spottxtValue = $('#edLF-Spot').val() == "" ? "0" : $('#edLF-Spot').val();
        var roughcuttxtValue = $('#edLF-RoughCut').val() == "" ? "0" : $('#edLF-RoughCut').val();
        var webpiecetxtValue = $('#edLF-WebPiece').val() == "" ? "0" : $('#edLF-WebPiece').val();
        var brollteasestxtValue = $('#edLF-BRollTeases').val() == "" ? "0" : $('#edLF-BRollTeases').val();
        var awardstxtValue = $('#edLF-Awards').val() == "" ? "0" : $('#edLF-Awards').val();

        var editItemData = [];
        if (spottxtValue !== "0" && spottxtValue !== "00" && spottxtValue !== "000") {
            editRequestData.PESpot = spottxtValue;
            spottxtValue = 'Spot ' + spottxtValue;
            editItemData.push(spottxtValue);
        }
        if (roughcuttxtValue !== "0" && roughcuttxtValue !== "00" && roughcuttxtValue !== "000") {
            editRequestData.PERoughCut = roughcuttxtValue;
            roughcuttxtValue = 'Rough Cut ' + roughcuttxtValue;
            editItemData.push(roughcuttxtValue);
        }
        if (webpiecetxtValue !== "0" && webpiecetxtValue !== "00" && webpiecetxtValue !== "000") {
            editRequestData.PEWebPiece = webpiecetxtValue;
            webpiecetxtValue = 'Web Piece ' + webpiecetxtValue;
            editItemData.push(webpiecetxtValue);
        }
        if (brollteasestxtValue !== "0" && brollteasestxtValue !== "00" && brollteasestxtValue !== "000") {
            editRequestData.PEBrollTeases = brollteasestxtValue;
            brollteasestxtValue = 'B-Roll/Teases ' + brollteasestxtValue;
            editItemData.push(brollteasestxtValue);
        }
        if (awardstxtValue !== "0" && awardstxtValue !== "00" && awardstxtValue !== "000") {
            editRequestData.PEAwards = awardstxtValue;
            awardstxtValue = 'Awards ' + awardstxtValue;
            editItemData.push(awardstxtValue);
        }
        
        $('#edLF_addRequirements_value').text(editItemData.join(', '));

        var piectMinuteValue = '';
        if ($('#edLF_producer_Piecetbd_textbox').is(':checked')) {
            $('#edLF_producer_Piecetbd_value').text('Yes');
            editRequestData.PETBD = 'Yes';
        }
        else {
            $('#edLF_producer_Piecetbd_value').text('No');
            editRequestData.PETBD = 'No';
            var pieceMin = $('#edLF_producer_PieceMinutes_textbox').val().trim();
            var pieceSec = $('#edLF-producer-PieceSeconds').val().trim();

            if (pieceMin !== '') {
                piectMinuteValue = piectMinuteValue + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' hour ' : ' hours ');
            }
            if (pieceSec !== '') {
                piectMinuteValue = piectMinuteValue + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' minute ' : ' minutes ');
            }
        }

        $('#edLF_producer_PieceMinutes_value').text(piectMinuteValue);


        var pieceDays = $('#edLF_producer_crafttimedays_textbox').val().trim();
        var pieceHrs = $('#edLF_producer_crafttimehrs_textbox').val().trim();
        var pieceMin = $('#edLF_producer_crafttimemin_textbox').val().trim();

        var producerEditTime = '';
        if (pieceDays !== '') {
            producerEditTime = producerEditTime + pieceDays + ((pieceDays === '0' || pieceDays === '00' || pieceDays === '000' || pieceDays === '1' || pieceDays === '01' || pieceDays === '001') ? ' day ' : ' days ');
        }
        if (pieceHrs !== '') {
            producerEditTime = producerEditTime + pieceHrs + ((pieceHrs === '0' || pieceHrs === '00' || pieceHrs === '000' || pieceHrs === '1' || pieceHrs === '01' || pieceHrs === '001') ? ' hour ' : ' hours ');
        }
        if (pieceMin !== '') {
            producerEditTime = producerEditTime + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
        }

        $('#edLF_producer_crafttime_value').text(producerEditTime);
    }

    this.Init = function () {
        $(".button-edit").off("click");
        $("#LFSummaryEditPage .button-edit").off("click");
        $("#LFcraftEditPage .button-edit").off("click");
        $("#LFProducerEditPage .button-edit").off("click");
        $("#LFAssistantEditorEditPage .button-edit").off("click");
       
        editRequestData = this.editRequestData;

        $('#LFProducerEditPage .button-edit').bind('click', this.ProducerEditItems);
        if ($('#LFProducerEditPage .button-edit').text() == "edit") {
            producerSectionSave();
        }
    }
};
NBCU.LFFulfiller.Producer.prototype.PostBack = false;