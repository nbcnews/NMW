NBCU.CrewRequest.Correspondent.When = function () {
    var validCheck = true;

    this.AppendTransmissionType = function (transmissionTypeData) {
        $('#transmissiontype-cls').find('option:not(:first)').remove();
        $.each(transmissionTypeData, function (index, data) {
            $('#transmissiontype-cls').append('<option id="' + data.ID + '">' + data.TransmissionType + '</option>');
        });
    };

    function compareShootArray(oldArray, newArray) {
        var found = false;

        var deleteData = [];
        $.each(newArray, function (index, new_obj) {
            var firstShootDescriptionValue = new_obj['ShootDescription'] == null ? "" : new_obj['ShootDescription'];
            var isExist = oldArray.filter(function (item) {
                item.ShootDescription = item.ShootDescription == null ? "" : item.ShootDescription;
                if (item.ShootDescription == firstShootDescriptionValue) {
                    newArray[index].ID = item.ID;
                    return true;
                }
                else {
                    var existInNewArray = newArray.filter(function (data) {
                        data.ShootDescription = data.ShootDescription == null ? "" : data.ShootDescription;
                        if (data.ShootDescription == item.ShootDescription) {
                            return true
                        }
                        return false
                    });
                    if (existInNewArray.length == 0 && $.inArray(item.ID, deleteData) == -1) {
                        deleteData.push(item.ID);
                    }
                }
            });

            if (isExist.length == 0) {
                var savedata = NBCU.CrewRequest.Helper.addItem(new_obj, 'CRT_ShootDescription');
                newArray[index].ID = savedata.d.Id;
            }
        });

        $.each(deleteData, function (index, ID) {
            var data = {
                __metadata: newArray['__metadata'],
                ID: ID
            };
            NBCU.CrewRequest.Helper.deleteItem(data, 'CRT_ShootDescription', ID);
        })
        return newArray;
    }

    function validation() {
        var valid = true;
        if (!!$('#meettime-min-cls').val() && $('#meettime-min-cls').val() != "00" && $('#meettime-min-cls').val() != "000" && $('#meettime-min-cls').val() != "0") {
            valid = true;
            $('#meettime-min-cls').parent().next().hide();
        }
        else {
            valid = false;
            $('#meettime-min-cls').parent().next().show();
        }
        if (!valid) {
            if (!!$('#meettime-hr-cls').val() && $('#meettime-hr-cls').val() != "0" && $('#meettime-hr-cls').val() != "00" && $('#meettime-hr-cls').val() != "000") {
                valid = true;
                $('#meettime-hr-cls').parent().next().hide();
            }
            else {
                valid = false;
                $('#meettime-hr-cls').parent().next().show();
            }
        }
        return valid;
    }

    this.saveDataItem = function () {
        if (validation()) {

            var meetTime = $('#meettime-hr-cls').val() + ":" + $('#meettime-min-cls').val() + " " + $('#meettime-select-cls').val();
            var rollTime = $('#rolltime-hr-cls').val() + ":" + $('#rolltime-min-cls').val() + " " + $('#rolltime-select-cls').val();
            var endTime = $('#endtime-hr-cls').val() + ":" + $('#endtime-min-cls').val() + " " + $('#endtime-select-cls').val();

            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                MeetTime: meetTime,
                RollTime: rollTime,
                EndTime: endTime,
                SpecialGear: $('#specialgear-cls').val(),
                TransmissionType: $('#transmissiontype-cls').val(),
                RequestStatus: 'New',
                CrewStatus: 'Step4',
                CrewRequestID: NBCU.CrewRequest.Helper.getCrewRequestID(NBCU.CrewRequest.Helper.clsSaveID)
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.clsSaveID);
            var shootDesc_data = [];
            if (NBCU.CrewRequest.Helper.bnSaveID != 0 && !NBCU.CrewRequest.Helper.dataShootSaved) {
                shootDesc_data = {
                    __metadata: { 'type': 'SP.Data.CRT_x005f_ShootDescriptionListItem' },
                    Title: $('#shootdesc-cls').val(),
                    ShootDescription: $('#shootdesc-cls').val(),
                    RequestID: NBCU.CrewRequest.Helper.clsSaveID.toString()
                };
                var savedata = NBCU.CrewRequest.Helper.addItem(shootDesc_data, 'CRT_ShootDescription');
                shootDesc_data.ID = savedata.d.Id;
                NBCU.CrewRequest.Helper.dataShootSaved = true;
                NBCU.CrewRequest.Helper.whenPageShootData.push(shootDesc_data);
            }
            else {
                var newShootArray = [];
                shootDesc_data = {
                    __metadata: { 'type': 'SP.Data.CRT_x005f_ShootDescriptionListItem' },
                    Title: $('#shootdesc-cls').val(),
                    ShootDescription: $('#shootdesc-cls').val(),
                    RequestID: NBCU.CrewRequest.Helper.clsSaveID.toString()
                };
                newShootArray.push(shootDesc_data);
                var updatedNewArray = compareShootArray(NBCU.CrewRequest.Helper.whenPageShootData, newShootArray);
                NBCU.CrewRequest.Helper.whenPageShootData = [];
                $.each(updatedNewArray, function (new_index, new_obj) {
                    NBCU.CrewRequest.Helper.whenPageShootData.push(new_obj);
                });
            }

            var currentdateobj = new Date();
            var currdate = NBCU.CrewRequest.Helper.dateParse(currentdateobj);
            var currdtime = currentdateobj.getHours() + ":"
                        + currentdateobj.getMinutes() + ":"
                        + currentdateobj.getSeconds();
            var revisionNote_data = [];
            revisionNote_data = {
                __metadata: { 'type': 'SP.Data.CRT_x005f_RevisionNotesListItem' },
                Title: "Correspondent Live Shot",
                RevisedBy: $('.ms-core-menu-root:eq(0)').contents().first().text(),
                RevisedComments: "New Crew Request is submitted",
                RevicedDate: currdate + "  " + currdtime,
                RevisedNumber: "New",
                CrewRequestID: NBCU.CrewRequest.Helper.clsSaveID.toString()
            };
            NBCU.CrewRequest.Helper.addItem(revisionNote_data, 'CRT_RevisionNotes');

            $('#thanksScreen').show();
            $('#thanksScreen').addClass('popupscreen-thanks');
            $('.active-inprogress').removeClass().addClass('active');
            $('body').addClass('overflow');
        }
    }

    this.ClosePopup = function () {
        if ($(window).width() >= 1200) {
            $('#thanksScreen').hide();
            $('#thanksScreen').addClass('popupscreen-thanks');
            $('body').removeClass('overflow');
            SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
        }
        else {
            window.location.href = "/Pages/home.aspx";
        }
    }

    this.redirect = function () {
        if ($(this).attr('title').trim() == "CLSBack") {
            $('.clsNav li').removeClass('active-inprogress').removeClass('active');
            $('.clsNav li:eq(0)').addClass('active');
            $('.clsNav li:eq(1)').addClass('active');
            $('.clsNav li:eq(2)').addClass('active-inprogress');
            $("#CLSwherePage").show();
            $("#CLSwhoPage").hide();
            $("#CLSwhatPage").hide();
            $("#CLSwhenPage").hide();
        }
        else {
            NBCU.CrewRequest.Master.redirectPage($(this).attr('title').trim());
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        if (NBCU.CrewRequest.Helper.whentransmissionTypeData.length == 0) {
            NBCU.CrewRequest.Helper.whentransmissionTypeData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "TransmissionType", "?select=TransmissionType,TransmissionTypePointValue,ID");
            this.AppendTransmissionType(NBCU.CrewRequest.Helper.whentransmissionTypeData);
        }
        $('#CLSwhenPage span[title="CLSBack"]').unbind('click');
        $('#CLSwhenPage span[title="CLSBack"]').bind('click', this.redirect);
        $('#CLSwhenPage a[title="CLSNext"]').unbind('click');
        $('#CLSwhenPage a[title="CLSNext"]').bind('click', this.saveDataItem);
        $('.button-close').unbind('click');
        $('.button-close').bind('click', this.ClosePopup);

        $('#CorrespondentLiveShot span[title="CLSwherePage"]').unbind('click');
        $('#CorrespondentLiveShot span[title="CLSwherePage"]').bind('click', this.redirect);
        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').css('cursor', 'pointer');
        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').css('cursor', '');
        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').unbind('click');
        $('#CorrespondentLiveShot span[title="CLSwhatPage"]').css('cursor', '');
        $('#CorrespondentLiveShot span[title="CLSwhatPage"]').unbind('click');

        $("#meettime-hr-cls, #rolltime-hr-cls, #endtime-hr-cls").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
        });

        $("#meettime-min-cls, #rolltime-min-cls, #endtime-min-cls").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
        });
    }
};
NBCU.CrewRequest.Correspondent.When.prototype.PostBack = false;