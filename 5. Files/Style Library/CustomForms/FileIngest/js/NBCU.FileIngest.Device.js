NBCU.FileIngest.Device = function () {

    function collectData() {
        var cameraTypes = "";
        var otherText = "";
        $.each($('[name="AdditionalRequirements"]:checked'), function (ind, val) {
            cameraTypes += $(this).next().text() + ";";
            if ($(this).next().text() == "Other") {
                otherText = $('.othertxt').val();
            }
        });

        var data = {
            __metadata: { 'type': 'SP.Data.FileIngestListItem' },
            CameraType: $('#edr-Spot').val(),
            CameraType: cameraTypes,
            CameraTypeOther: otherText,
            IngestStatus: "Device and camera type",
            FileIngestID: NBCU.FileIngest.Helper.getFileIngestID(NBCU.FileIngest.Helper.saveID)
        };
        return data;
    }

    function addDevice() {
        var elem = '<div class = "mainrow"><div class="form-container form-container-horizontal">' +
                                '<div class="row">' +
                                    '<div class="cols cols-12 form-group FLN-form-group-device">' +
                                        '<label class="label label-display"> Device Type:<sup class="mandatory">*</sup> </label>' +
                                        '<div class="display-dataform-new display-dataform-FLN-summary-slug">' +
                                            '<select class="selectbox-full fi-DeviceType">' +
                                                '<option></option>' +
                                                '<option>(None)</option>' +
                                                '<option>COMPACT FLASH CARD (CF CARD)</option>' +
                                                '<option>HARD DRIVE</option>' +
                                                '<option>MICRO SD CARD</option>' +
                                                '<option>OTHER</option>' +
                                                '<option>P2 CARD</option>' +
                                                '<option>PRODUCER MAILBOX</option>' +
                                                '<option>SD CARD</option>' +
                                                '<option>SXS CARD</option>' +
                                                '<option>THUMB DRIVE</option>' +
                                                '<option>XDCAM DISC</option>' +
                                            '</select>' +
                                            '<div class="valid-msg valid-msg-error" style="display: none;">Please complete the required field</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="form-container form-container-horizontal">' +
                                '<div class="row">' +
                                    '<div class="cols cols-2-5 form-group FLN-form-group-quantity">' +
                                        '<label class="label label-display"> Quantity: </label>' +
                                        '<div class="display-dataform-new display-dataform-FLN-summary-slug">' +
                                            '<input class="selectbox-full fi-Quantity" type="text">' +
                                            '<div class="valid-msg valid-msg-error" style="display: none;">Please complete the required field</div>' +
                                        '</div>' +
                                    '</div><div class="fi-removebutton"> remove </div>' +
                                '</div>' +
                            '</div></div>';
        return elem;
    }

    function validTextbox(element) {
        var valid = true;
        if (element.val() == "") {
            element.next().show();
            valid = false;
        }
        else {
            element.next().hide();
            valid = true;
        }
        return valid;
    }

    function validation() {
        var valid = true;
        $.each($('.fi-DeviceType'), function (ind, val) {
            valid = validTextbox($(this));
        });
        if ($('#FLN-Device-Camera .valid-msg-error').is(":visible")) {
            valid = false;
        }
        return valid;
    }

    this.saveItem = function () {
        if (validation()) {
            var data = collectData();
            if (NBCU.FileIngest.Helper.saveID != 0) {
                NBCU.FileIngest.Helper.updateItem(data, 'FileIngest', NBCU.FileIngest.Helper.saveID);
                var er_AddDevices = NBCU.FileIngest.Helper.ReadList("", "AdditionalDevices", "?select=ID,fileIngestID&$filter=fileIngestID eq'" + NBCU.FileIngest.Helper.saveID.toString() + "'");
                $.each(er_AddDevices, function (ind, val) {
                    NBCU.FileIngest.Helper.deleteItem(data, 'AdditionalDevices', val.ID);
                });
                $.each($('.fi-DeviceType'), function (ind, val) {
                    var showunit_data = {
                        __metadata: { 'type': 'SP.Data.AdditionalDevicesListItem' },
                        Title: $(this).val(),
                        fileIngestID: NBCU.FileIngest.Helper.saveID.toString(),
                        DeviceType: $(this).val(),
                        Quantity: $('.fi-Quantity:eq(' + ind + ')').val()
                    };
                    NBCU.FileIngest.Helper.addItem(showunit_data, 'AdditionalDevices');
                });
            }
            NBCU.FileIngest.Master.redirectPage("Additional");
        }
    }

    /* ------------- Init ------------------------ */

    this.Init = function () {
        $('#FLN-Device-Camera span[title="Next"]').unbind('click');
        $('#FLN-Device-Camera span[title="Next"]').bind('click', this.saveItem);
        $('.button-addDevice').unbind('click');
        $('.button-addDevice').click(function () {
            $(this).parent().before(addDevice())
        });
        $('.otherchange').unbind('change');
        $('.otherchange').change(function () {
            if ($(this).is(':checked')) {
                $(this).next().next().show();
            }
            else {
                $(this).next().next().hide();
                $(this).next().next().val('');
            }
        });
    }
}

NBCU.FileIngest.Device.prototype.PostBack = false;