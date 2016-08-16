NBCU.FIFulfiller.Device = function () {
    var validCheck = true;
    this.productionTypeData = [];
    this.talentData = [];
    this.storyData = [];
    this.showUnitData = [];
    this.editRequestData;
    this.crt_TalentData = [];
    this.crt_ShowUnitData = [];
    this.crt_ShootData = [];

    this.AddDevice = function () {
        NBCU.FIFulfiller.Helper.txtDevice++;
        var btn_click_cntl = '<div class="row">' +
                '<div class="cols cols-3-5 form-group">' +
                    '<label class="label label-display">Device Type </label>' +
                    '<div class="display-data1">' +
                        '<select class="selectbox-full fif-DeviceType textbox" id="FIF_DeviceType_input_' + NBCU.FIFulfiller.Helper.txtDevice + '">' +
                            '<option></option><option>(None)</option><option>COMPACT FLASH CARD (CF CARD)</option><option>HARD DRIVE</option>' +
                            '<option>MICRO SD CARD</option><option>OTHER</option><option>P2 CARD</option><option>PRODUCER MAILBOX</option>' +
                            '<option>SD CARD</option><option>SXS CARD</option><option>THUMB DRIVE</option><option>XDCAM DISC</option>' +
                            '</select>' +
                        '<span id="FIF_DeviceType_' + NBCU.FIFulfiller.Helper.txtDevice + '" class="display-data"></span>' +
                    '</div>' +
                '</div>' +
                '<div class="cols cols-3-5 form-group">' +
                    '<label class="label label-display">Quantity </label>' +
                    '<div class="display-data1">' +
                        '<input class="selectbox-full fif-Quantity textbox" type="text" id="FIF_Quantity_input_' + NBCU.FIFulfiller.Helper.txtDevice + '">' +
                        '<span class="display-data" id="FIF_Quantity_' + NBCU.FIFulfiller.Helper.txtDevice + '"></span>' +
                    '</div><span class="remove-button button-remove-device"></span>' +
                '</div>' +
        '</div>';

        $(this).parent().before(btn_click_cntl);
        $('#FIF_DeviceType_input_' + NBCU.FIFulfiller.Helper.txtDevice).show();
        $('#FIF_Quantity_input_' + NBCU.FIFulfiller.Helper.txtDevice).show();
    };

    this.RemoveDevice = function () {
        $(this).closest('.row').remove();
    };

    this.deviceEditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();
            $(this).parent().parent().find('.icon-datepicker').show();
            $('.button-remove-device').show();
            $('.button-addDevice').show();
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                var ctrlID = $(this).attr('id');
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
            });
            deviceCameraSectionSave();
        }
        event.stopPropagation();
    }

    function deviceCameraSectionSave() {

        $.each($("input:text[id^='FIF_DeviceType_input_']"), function (shInd, shVal) {
            $('#FIF_DeviceType_' + shInd).text($('#FIF_DeviceType_input_' + shInd).val());
            $('#FIF_Quantity_' + shInd).text($('#FIF_Quantity_input_' + shInd).val());
        });
        $('.button-remove-device').hide();
        $('.button-addDevice').hide();

        var cameraTypes = "";
        var otherText = "";
        var cameratypearray = [];
        $.each($('[name="AdditionalRequirements"]:checked'), function (ind, val) {
            cameratypearray.push($(this).next().text());
            if (ind == $('[name="AdditionalRequirements"]:checked').length - 1) {
                cameraTypes = cameraTypes + $(this).next().text();
            }
            else {
                cameraTypes = cameraTypes + $(this).next().text() + ";";
            }
            if ($(this).next().text() == "Other") {
                cameratypearray.splice(cameratypearray.indexOf("Other"), 1);
                cameratypearray.push($('.othertxt').val());
                otherText = $('.othertxt').val();
            }
        });
        editRequestData.CameraType = cameraTypes;
        $('#FIF_cameratype').text(cameratypearray.join(';'));
    }

    this.Init = function () {
        $(".button-edit").off("click");
        $("#FIFSummary .button-edit").off("click");
        $("#FIFdevicecamera .button-edit").off("click");
        $("#FIFadditionalinfo .button-edit").off("click");
        $('.button-remove-device').show();
        $('.button-addDevice').show();
        editRequestData = this.editRequestData;
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        $('#FIFdevicecamera .button-edit').bind('click', this.deviceEditItems);
        $(".button-addDevice").unbind('click');
        $(".button-addDevice").bind('click', this.AddDevice);
        $(document).on("click", ".button-remove-device", this.RemoveDevice);

        if ($('#FIFdevicecamera .button-edit').text() == "edit") {
            deviceCameraSectionSave();
        }

        $(".button-adddevice").unbind('click');
        $(".button-adddevice").bind('click', this.AddDevice);
        $(document).on("click", ".button-remove-device", this.RemoveDevice);
        $('.otherchange').unbind('change');
        $('.otherchange').change(function () {
            if ($(this).is(':checked')) {
                $(this).prop('checked', true);
                $(this).next().next().show();
            }
            else {
                $(this).next().next().hide();
                $(this).next().next().val('');
            }
        });
    }
};
NBCU.FIFulfiller.Device.prototype.PostBack = false;