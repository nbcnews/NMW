NBCU.ERFulfiller.Producer = function () {
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
            $(this).parent().parent().find('.box-edr-producer-produer').show();
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
        var spottxtValue = $('#edr-Spot').val() == "" ? "0" : $('#edr-Spot').val();
        var roughcuttxtValue = $('#edr-RoughCut').val() == "" ? "0" : $('#edr-RoughCut').val();
        var webpiecetxtValue = $('#edr-WebPiece').val() == "" ? "0" : $('#edr-WebPiece').val();
        var brollteasestxtValue = $('#edr-BRollTeases').val() == "" ? "0" : $('#edr-BRollTeases').val();
        var sizzlereeltxtValue = $('#edr-SizzleReel').val() == "" ? "0" : $('#edr-SizzleReel').val();
        var promostxtValue = $('#edr-Promos').val() == "" ? "0" : $('#edr-Promos').val();
        var awardstxtValue = $('#edr-Awards').val() == "" ? "0" : $('#edr-Awards').val();
        var editItemData = [];
        if (spottxtValue !== "0") {
            editRequestData.PESpot = spottxtValue;
            spottxtValue = 'Spot ' + spottxtValue;
            editItemData.push(spottxtValue);
        }
        if (roughcuttxtValue !== "0") {
            editRequestData.PERoughCut = roughcuttxtValue;
            roughcuttxtValue = 'Rough Cut ' + roughcuttxtValue;
            editItemData.push(roughcuttxtValue);
        }
        if (webpiecetxtValue !== "0") {
            editRequestData.PEWebPiece = webpiecetxtValue;
            webpiecetxtValue = 'Web Piece ' + webpiecetxtValue;
            editItemData.push(webpiecetxtValue);
        }
        if (brollteasestxtValue !== "0") {
            editRequestData.PEBrollTeases = brollteasestxtValue;
            brollteasestxtValue = 'B-Roll/Teases ' + brollteasestxtValue;
            editItemData.push(brollteasestxtValue);
        }
        if (sizzlereeltxtValue !== "0") {
            editRequestData.PESizzleReel = sizzlereeltxtValue;
            sizzlereeltxtValue = 'Sizzle Reel ' + sizzlereeltxtValue;
            editItemData.push(sizzlereeltxtValue);
        }
        if (promostxtValue !== "0") {
            editRequestData.PEPromos = promostxtValue;
            promostxtValue = 'Promos ' + promostxtValue;
            editItemData.push(promostxtValue);
        }
        if (awardstxtValue !== "0") {
            editRequestData.PEAwards = awardstxtValue;
            awardstxtValue = 'Awards ' + awardstxtValue;
            editItemData.push(awardstxtValue);
        }

        $('#edrf_addRequirements_value').text(editItemData.join(', '));
        var piectMinuteValue = '';
        if ($('#edrf_producer_Piecetbd_textbox').is(':checked')) {
            $('#edrf_producer_Piecetbd_value').text('Yes');
            editRequestData.PETBD = 'Yes';
        }
        else {
            $('#edrf_producer_Piecetbd_value').text('No');
            editRequestData.PETBD = 'No';
            var pieceMin = $('#edr_producer_PieceMinutes_textbox').val().trim();
            var pieceSec = $('#edr-producer-PieceSeconds').val().trim();

            if (pieceMin !== '') {
                piectMinuteValue = piectMinuteValue + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
            }
            if (pieceSec !== '') {
                piectMinuteValue = piectMinuteValue + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' second ' : ' seconds ');
            }
        }

        $('#edr_producer_PieceMinutes_value').text(piectMinuteValue);


        var pieceDays = $('#edr_producer_crafttimedays_textbox').val().trim();
        var pieceHrs = $('#edr_producer_crafttimehrs_textbox').val().trim();
        var pieceMin = $('#edr_producer_crafttimemin_textbox').val().trim();

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

        $('#edr_producer_crafttime_value').text(producerEditTime);
    }

    this.Init = function () {
        $(".button-edit").off("click");
        $("#ERSummaryEditPage .button-edit").off("click");
        $("#ERcraftEditPage .button-edit").off("click");
        $("#ERProducerEditPage .button-edit").off("click");
       
        editRequestData = this.editRequestData;

        $('#ERProducerEditPage .button-edit').bind('click', this.ProducerEditItems);
        if ($('#ERProducerEditPage .button-edit').text() == "edit") {
            producerSectionSave();
        }
    }
};
NBCU.ERFulfiller.Producer.prototype.PostBack = false;