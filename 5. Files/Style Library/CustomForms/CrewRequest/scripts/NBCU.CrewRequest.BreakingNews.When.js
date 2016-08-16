NBCU.CrewRequest.BreakingNews.When = function () {
    var validCheck = true;

    this.AppendTransmissionType = function (transmissionTypeData) {
        $('#transmissiontype-bns').find('option:not(:first)').remove();
        $.each(transmissionTypeData, function (index, data) {
            $('#transmissiontype-bns').append('<option id="' + data.ID + '">' + data.TransmissionType + '</option>');
        });
    };

    function getValidate() {
        validCheck = true;

        if ($('#meettime-hr-bns').val() == "" && $('#meettime-min-bns').val() == "") {
            $('#meettime-hr-bns').next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#meettime-hr-bns').next().next().next().hide();
        }
        if (parseFloat($('#meettime-hr-bns').val()) == 0 && parseFloat($('#meettime-min-bns').val()) ==0) {
            $('#meettime-hr-bns').next().next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#meettime-hr-bns').next().next().next().next().hide();
        }
        //if ($('#meettime-hr-bns').val() != "") {
        //    var isValid = NBCU.CrewRequest.Helper.validHour($('#meettime-hr-bns').val());
        //    if (!isValid) {
        //        $('#meettime-hr-bns').next().next().next().next().show();
        //        validCheck = false;
        //    }
        //    else {
        //        validCheck = (validCheck == true) ? true : false;
        //        $('#meettime-hr-bns').next().next().next().next().hide();
        //    }
        //}
        //if ($('#meettime-min-bns').val() != "") {
        //    var isValid = NBCU.CrewRequest.Helper.validMin($('#meettime-min-bns').val());
        //    if (!isValid) {
        //        $('#meettime-min-bns').next().next().next().show();
        //        validCheck = false;
        //    }
        //    else {
        //        validCheck = (validCheck == true) ? true : false;
        //        $('#meettime-min-bns').next().next().next().hide();
        //    }
        //}

        return validCheck;
    };

    //function compareShootArray(oldArray, newArray) {
    //    var found = false;

    //    var deleteData = [];
    //    $.each(newArray, function (index, new_obj) {
    //        var firstShootDescriptionValue = new_obj['ShootDescription'] == null ? "" : new_obj['ShootDescription'];
    //        var isExist = oldArray.filter(function (item) {
    //            item.ShootDescription = item.ShootDescription == null ? "" : item.ShootDescription;
    //            if (item.ShootDescription == firstShootDescriptionValue) {
    //                newArray[index].ID = item.ID;
    //                return true;
    //            }
    //            else {
    //                var existInNewArray = newArray.filter(function (data) {
    //                    data.ShootDescription = data.ShootDescription == null ? "" : data.ShootDescription;
    //                    if (data.ShootDescription == item.ShootDescription) {
    //                        return true
    //                    }
    //                    return false
    //                });
    //                if (existInNewArray.length == 0 && $.inArray(item.ID, deleteData) == -1) {
    //                    deleteData.push(item.ID);
    //                }
    //            }
    //        });

    //        if (isExist.length == 0) {
    //            var savedata = NBCU.CrewRequest.Helper.addItem(new_obj, 'CRT_ShootDescription');
    //            newArray[index].ID = savedata.d.Id;
    //        }
    //    });

    //    $.each(deleteData, function (index, ID) {
    //        var data = {
    //            __metadata: newArray['__metadata'],
    //            ID: ID
    //        };
    //        NBCU.CrewRequest.Helper.deleteItem(data, 'CRT_ShootDescription', ID);
    //    })
    //    return newArray;
    //}

    this.saveDataItem = function () {
        validCheck = getValidate();

        if (validCheck) {
            var meetTime = $('#meettime-hr-bns').val() + ":" + $('#meettime-min-bns').val() + " " + $('#meettime-select-bns').val();
            var rollTime = $('#rolltime-hr-bns').val() + ":" + $('#rolltime-min-bns').val() + " " + $('#rolltime-select-bns').val();
            var endTime = $('#endtime-hr-bns').val() + ":" + $('#endtime-min-bns').val() + " " + $('#endtime-select-bns').val();

            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                MeetTime: meetTime,
                RollTime: rollTime,
                EndTime: endTime,
                SpecialGear: $('#specialgear-bns').val(),
                TransmissionType: $('#transmissiontype-bns').val(),
                Camera: $('#numcamera-bns').val(),
                Audio: $('#numaudio-bns').val(),
                SelectedResources: $('#bns-whenPage .total-amount:eq(0)').text(),
                RequestStatus: 'New',
                ShootDescription: $('#shootdesc-bns').val(),
                CrewStatus: 'Step4',
                CrewRequestID: NBCU.CrewRequest.Helper.getCrewRequestID(NBCU.CrewRequest.Helper.bnSaveID)
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.bnSaveID);
            //var shootDesc_data = [];
            //if (NBCU.CrewRequest.Helper.bnSaveID != 0 && !NBCU.CrewRequest.Helper.dataShootSaved) {
            //    shootDesc_data = {
            //        __metadata: { 'type': 'SP.Data.CRT_x005f_ShootDescriptionListItem' },
            //        Title: $('#shootdesc-bns').val(),
            //        ShootDescription: $('#shootdesc-bns').val(),
            //        RequestID: NBCU.CrewRequest.Helper.bnSaveID.toString()
            //    };
            //    var savedata = NBCU.CrewRequest.Helper.addItem(shootDesc_data, 'CRT_ShootDescription');
            //    shootDesc_data.ID = savedata.d.Id;
            //    NBCU.CrewRequest.Helper.dataShootSaved = true;
            //    NBCU.CrewRequest.Helper.whenPageShootData.push(shootDesc_data);
            //}
            //else {
            //    var newShootArray = [];
            //    shootDesc_data = {
            //        __metadata: { 'type': 'SP.Data.CRT_x005f_ShootDescriptionListItem' },
            //        Title: $('#shootdesc-bns').val(),
            //        ShootDescription: $('#shootdesc-bns').val(),
            //        RequestID: NBCU.CrewRequest.Helper.bnSaveID.toString()
            //    };
            //    newShootArray.push(shootDesc_data);
            //    var updatedNewArray = compareShootArray(NBCU.CrewRequest.Helper.whenPageShootData, newShootArray);
            //    NBCU.CrewRequest.Helper.whenPageShootData = [];
            //    $.each(updatedNewArray, function (new_index, new_obj) {
            //        NBCU.CrewRequest.Helper.whenPageShootData.push(new_obj);
            //    });
            //}

            var currentdateobj = new Date();
            var currdate = NBCU.CrewRequest.Helper.dateParse(currentdateobj);
            var currdtime = currentdateobj.getHours() + ":"
                        + currentdateobj.getMinutes() + ":"
                        + currentdateobj.getSeconds();
            var revisionNote_data = [];
            revisionNote_data = {
                __metadata: { 'type': 'SP.Data.CRT_x005f_RevisionNotesListItem' },
                Title: "Breaking News",
                RevisedBy: $('.ms-core-menu-root:eq(0)').contents().first().text(),
                RevisedComments: "New Crew Request is submitted",
                RevicedDate: currdate + "  " + currdtime,
                RevisedNumber: "New",
                CrewRequestID: NBCU.CrewRequest.Helper.bnSaveID.toString()
            };
            NBCU.CrewRequest.Helper.addItem(revisionNote_data, 'CRT_RevisionNotes');

            $('#thanksScreen').show();
            $('#thanksScreen').addClass('popupscreen-thanks');
            $('.active-inprogress').removeClass().addClass('active');
            $('body').addClass('overflow');
            //NBCU.CrewRequest.Helper.sendEmail(NBCU.CrewRequest.Helper.bnSaveID);
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
        if ($(this).attr('title').trim() == "bnBack") {
            $('.bnsNav li').removeClass('active-inprogress').removeClass('active');
            $('.bnsNav li:eq(0)').addClass('active');
            $('.bnsNav li:eq(1)').addClass('active');
            $('.bnsNav li:eq(2)').addClass('active-inprogress');
            $('#bns-wherePage').show();
            $('#bns-whatPage').hide();
            $('#bns-whoPage').hide();
            $('#bns-whenPage').hide();
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

        $('#bns-whenPage span[title="bnBack"]').unbind('click');
        $('#bns-whenPage span[title="bnBack"]').bind('click', this.redirect);
        $('#bns-whenPage a[title="bnNext"]').unbind('click');
        $('#bns-whenPage a[title="bnNext"]').bind('click', this.saveDataItem);
        $('.button-close').unbind('click');
        $('.button-close').bind('click', this.ClosePopup);

        $('#BreakingNews span[title="bns-wherePage"]').unbind('click');
        $('#BreakingNews span[title="bns-wherePage"]').bind('click', this.redirect);
        $('#BreakingNews span[title="bns-whoPage"]').css('cursor', 'pointer');
        $('#BreakingNews span[title="bns-whoPage"]').css('cursor', '');
        $('#BreakingNews span[title="bns-whoPage"]').unbind('click');
        $('#BreakingNews span[title="bns-whatPage"]').css('cursor', '');
        $('#BreakingNews span[title="bns-whatPage"]').unbind('click');
        var currentDate = new Date();
        var meetHour = currentDate.getHours() + 1;
        var dateHour = meetHour.toString().length > 1 ? meetHour : '0' + meetHour;
        var dateMin = currentDate.getMinutes().toString().length > 1 ? currentDate.getMinutes() : '0' + currentDate.getMinutes();
        var getMeetTime = NBCU.CrewRequest.Helper.tConvert(dateHour + ":" + dateMin);
        var meetTimeSplit = getMeetTime.split(':');
        $('#meettime-hr-bns').val(meetTimeSplit[0]);
        $('#meettime-min-bns').val(meetTimeSplit[1]);
        $('#meettime-select-bns').val(meetTimeSplit[2]);
        $('#rolltime-hr-bns').val(meetTimeSplit[0]);
        $('#rolltime-min-bns').val(meetTimeSplit[1]);
        $('#rolltime-select-bns').val(meetTimeSplit[2]);
        $('#endtime-hr-bns').val('0');
        $('#endtime-min-bns').val('00');
        $('#endtime-select-bns').val('PM');
        $('#numcamera-bns').attr("disabled", true);
        $('#numaudio-bns').attr("disabled", true);

        $("#meettime-hr-bns, #rolltime-hr-bns, #endtime-hr-bns").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
        });

        $("#meettime-min-bns, #rolltime-min-bns, #endtime-min-bns").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
        });
    }
};
NBCU.CrewRequest.BreakingNews.When.prototype.PostBack = false;