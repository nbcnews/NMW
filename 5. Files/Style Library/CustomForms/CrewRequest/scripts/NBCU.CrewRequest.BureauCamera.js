NBCU.CrewRequest.BureauCamera = function () {
    var validCheck = true;
    this.storyData = [];
    this.showUnitData = [];

    this.bcAddShowUnit = function () {
        NBCU.CrewRequest.Helper.txtUnit++;
        var btn_click_cntl = '<div class="row row-BRC-showunit">' +
							'<div class="cols-12 BRC-cols-showunit">' +
							 '<div class="cols form-group BRC-form-showunit">' +
                                        '<label class="label label-display">Show Unit <sup class="mandatory">*</sup></label>' +
                                        '<div class="field-input">' +
                                            '<input class="selectbox-full" type="text" id="txtUnit-Bureau_' + NBCU.CrewRequest.Helper.txtUnit + '" txtUnit-Bureau_id_' + NBCU.CrewRequest.Helper.txtUnit + '="">' +
                                             '<div class="valid-msg valid-msg-error">Please complete the required field</div>' +
									         '<div class="valid-msg valid-msg-error">It is duplicated</div>' +
                                        '</div>' +
                                    '</div>' + '<div class="cols form-group BRC-form-budget">' + '<label class="label label-display">Budget Code <sup class="mandatory">*</sup></label>'
									+ '<div class="field-input">' + '<input type="text" class="selectbox-full" id="txtBucode-Bureau_' + NBCU.CrewRequest.Helper.txtUnit + '">' + '<div class="valid-msg valid-msg-error">Please complete the required field</div></div>' + '</div>' + '<span class="remove-button BRC-button-remove-showunit"></span>' + '</div>';
        $(this).parent().append(btn_click_cntl);
    };

    this.bcRemoveShowUnit = function () {
        $(this).closest('.row').remove();
    };

    this.AppendFrequentBureauLocation = function (FrequentBureauLocationData) {
        $('#bureaulocation-bc').find('option:not(:first)').remove();
        $.each(FrequentBureauLocationData, function (index, data) {
            $('#bureaulocation-bc').append('<option id="' + data.ID + '">' + data.FrequentLocationName.trim() + '</option>');
        });
    };

    this.bcUpdateContactDetails = function (event) {
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

        event.stopPropagation();
    };

    function initializePeoplePickerbc(peoplePickerElementId, allowMultiples) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = allowMultiples;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        var users = new Array(1);
        //users[0] = defaultUser;      // Render and initialize the picker. 
        //// Pass the ID of the DOM element that contains the picker, an array of initial
        //// PickerEntity objects to set the picker value, and a schema that defines
        //// picker properties.
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    function getValidate() {
        validCheck = true;
        if ($('#BCrequestermobile').text() == "" || $('#BCrequestermobile').prev().val() == "") {
            $('#BCrequestermobile').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#BCrequestermobile').next().hide();
        }
        if ($('#BCrequestermobile').prev().val() != "") {
            $('#BCrequestermobile').next().hide();
            if ($('#BCrequestermobile').prev().val().length <= 10) {
                $('#BCrequestermobile').next().next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#BCrequestermobile').next().next().hide();
            }
        }
        if ($('#BCrequesterdesk').prev().val() != "") {
            if ($('#BCrequesterdesk').prev().val().length <= 10) {
                $('#BCrequesterdesk').next().show();
                validCheck = false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                $('#BCrequesterdesk').next().hide();
            }
        }
        if ($('#assignmentslug-bc').val().trim() == "") {
            $('#assignmentslug-bc').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#assignmentslug-bc').next().hide();
        }
        if ($('#bureaulocation-bc').val() == "") {
            $('#bureaulocation-bc').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#bureaulocation-bc').next().hide();
        }
        var budget = [];
        $.each($("input:text[id^='txtUnit-Bureau_']"), function (ind, val) {
            var index = $(val).attr('id').split('_')[1];
            if ($(val).val().trim() == "" || $('#txtBucode-Bureau_' + index).val().trim() == "") {
                if ($(val).val().trim() == "") {
                    $(val).next().show();
                    validCheck = false;
                }
                else {
                    $('#txtBucode-Bureau_' + index).next().show();
                    validCheck = false;
                }
            }
            else {
                if ($.inArray($(val).val().trim(), budget) !== -1) {
                    $(val).next().next().show();
                    $(val).next().hide();
                    $('#txtBucode-Bureau_' + index).next().hide();
                    validCheck = false;
                }
                else {
                    budget.push($(val).val().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(val).next().hide();
                    $('#txtBucode-Bureau_' + index).next().hide();
                    $(val).next().next().hide();
                }
            }
        });
        if ($('#meettime-hr-bc').val() == "" || $('#meettime-min-bc').val() == "") {
            $('#meettime-hr-bc').next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#meettime-hr-bc').next().next().next().hide();
        }

        if (parseFloat($('#meettime-hr-bc').val()) == 0 && parseFloat($('#meettime-min-bc').val()) == 0) {
            $('#meettime-hr-bc').next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#meettime-hr-bc').next().next().next().hide();
        }

        return validCheck;
    };


    function returnKeyAdditionRequest() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerAdditionalUsersbcDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    this.saveDataItem = function () {

        validCheck = getValidate();
        if (validCheck) {
            var d = new Date();
            var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

            var meetTime = $('#meettime-hr-bc').val() + ":" + $('#meettime-min-bc').val() + " " + $('#meettime-select-bc').val();
            var rollTime = $('#rolltime-hr-bc').val() + ":" + $('#rolltime-min-bc').val() + " " + $('#rolltime-select-bc').val();
            var endTime = $('#endtime-hr-bc').val() + ":" + $('#endtime-min-bc').val() + " " + $('#endtime-select-bc').val();
            var additionalUser = "";
            if ($('#peoplePickerAdditionalUsersbcDiv_TopSpan span.ms-entity-resolved').length > 1) {
                $.each($('#peoplePickerAdditionalUsersbcDiv_TopSpan span.ms-entity-resolved'), function (ind, val) {
                    if (ind == $('#peoplePickerAdditionalUsersbcDiv_TopSpan span.ms-entity-resolved').length - 1) {
                        additionalUser = additionalUser + $(val).text().trim();
                    }
                    else {
                        additionalUser = additionalUser + $(val).text().trim() + " | ";
                    }
                });
            }
            else {
                additionalUser = $('#peoplePickerAdditionalUsersClsDiv_TopSpan span.ms-entity-resolved').text();
            }

            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                Requester: $('#BCrequester').text().trim(),
                Title: $('#BCrequester').text().trim(),
                Producer: $('#BCrequester').text().trim(),
                CellPhone1: ($('#BCrequestermobile').text().trim() == "") ? $('#BCrequestermobile').prev().val().trim() : $('#BCrequestermobile').text().trim(),
                DeskNumber: ($('#BCrequesterdesk').text().trim() == "") ? $('#BCrequesterdesk').prev().val().trim() : $('#BCrequesterdesk').text().trim(),
                CCEmail: additionalUser,
                StoryName: $('#txtStoryName-bc').val().trim(),
                AssignmentSlug: $('#assignmentslug-bc').val().trim(),
                BureauLocation: $('#bureaulocation-bc option:selected').text(),
                MeetTime: meetTime,
                RollTime: rollTime,
                EndTime: endTime,
                SpecialGear: $('#specialgear-cls').val(),
                TransmissionType: $('#transmissiontype-cls').val(),
                CrewType: NBCU.CrewRequest.Helper.CrewType.Bureau,
                RequestStatus: 'New',
                ShootDescription: $('#shootdesc-bc').val(),
                CrewStatus: 'Step1',
                CrewRequestID: NBCU.CrewRequest.Helper.getCrewRequestID(NBCU.CrewRequest.Helper.saveID),
                requestorKey: NBCU.CrewRequest.Helper.requestorKey,
                CCEmailKey: returnKeyAdditionRequest(),
                StartDate1: strDate,
                EndDate1: strDate
            };

            var savedata = NBCU.CrewRequest.Helper.addItem(data, 'CrewRequest');
            var crewID = savedata.d.Id;

            var updatedata = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                CrewRequestID: NBCU.CrewRequest.Helper.getCrewRequestID(crewID)
            };
            NBCU.CrewRequest.Helper.updateItem(updatedata, 'CrewRequest', crewID);

            //NBCU.CrewRequest.Helper.checkRemove('CRT_ShootDescription', crewID, 'RequestID');
            //var shootDesc_data = [];
            //shootDesc_data = {
            //    __metadata: { 'type': 'SP.Data.CRT_x005f_ShootDescriptionListItem' },
            //    Title: $('#shootdesc-bc').val(),
            //    ShootDescription: $('#shootdesc-bc').val(),
            //    RequestID: crewID.toString()
            //};
            //NBCU.CrewRequest.Helper.addItem(shootDesc_data, 'CRT_ShootDescription');

            NBCU.CrewRequest.Helper.checkRemove('CRT_ShowUnit', crewID, 'RequestID');

            $.each($("input:text[id^='txtUnit-Bureau_']"), function (ind, val) {
                if (!!$(this).val()) {
                    var showUnitIndex = val.id.split("_")[1];
                    showunit_data = {
                        __metadata: { 'type': 'SP.Data.CRT_x005f_ShowUnitListItem' },
                        Title: $(val).val(),
                        RequestID: crewID.toString(),
                        ShowUnitID: $(val).attr('txtUnit-Bureau_id_' + showUnitIndex).trim(),
                        AssignedBudgetCode: $('#txtBucode-Bureau_' + showUnitIndex).val()
                    };
                    NBCU.CrewRequest.Helper.addItem(showunit_data, 'CRT_ShowUnit');
                }
            });


            var currentdateobj = new Date();
            var currdate = NBCU.CrewRequest.Helper.dateParse(currentdateobj);
            var currdtime = currentdateobj.getHours() + ":"
                        + currentdateobj.getMinutes() + ":"
                        + currentdateobj.getSeconds();
            var revisionNote_data = [];
            revisionNote_data = {
                __metadata: { 'type': 'SP.Data.CRT_x005f_RevisionNotesListItem' },
                Title: "Bureau Camera",
                RevisedBy: $('.ms-core-menu-root:eq(0)').contents().first().text(),
                RevisedComments: "New Crew Request is submitted",
                RevicedDate: currdate + "  " + currdtime,
                RevisedNumber: "New",
                CrewRequestID: crewID.toString()
            };
            NBCU.CrewRequest.Helper.addItem(revisionNote_data, 'CRT_RevisionNotes');

            $('#thanksScreen').show();
            $('#thanksScreen').addClass('popupscreen-thanks');
            $('.active-inprogress').removeClass().addClass('active');
            $('body').addClass('overflow');

            //NBCU.CrewRequest.Helper.sendEmail(crewID);
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
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        if ($('#bureaulocation-bc').val() == "") {
            FrequentBureauLocationData = NBCU.CrewRequest.Helper.ReadList("", "FrequentLocation", "?select=FrequentLocationName,ID,AddressLine1,AddressNotes,Country,CrewCity,CrewState,Zip");
            this.AppendFrequentBureauLocation(FrequentBureauLocationData);
        }
        $('#BureauCamera .display-data1-login').text($('.display-data1:eq(0)').text());
        initializePeoplePickerbc('peoplePickerAdditionalUsersbcDiv', true);
        $(document).off().on("click", "#BureauCamera .button-edit-bc", this.bcUpdateContactDetails);
        $("#BureauCamera .BRC-button-addsu").unbind('click');
        $("#BureauCamera .BRC-button-addsu").bind('click', this.bcAddShowUnit);
        $(document).on("click", "#BureauCamera .BRC-button-remove-showunit", this.bcRemoveShowUnit);

        $('#BureauCamera span[title="bcSubmit"]').unbind('click');
        $('#BureauCamera span[title="bcSubmit"]').bind('click', this.saveDataItem);
        $('.button-close').unbind('click');
        $('.button-close').bind('click', this.ClosePopup);

        //var finalStoryData = $.map(storyData, function (item) {
        //    return {
        //        label: item.Story,
        //        value: item.Story
        //    }
        //});

        //$("#txtStoryName-bc").autocomplete({
        //    source: finalStoryData,
        //    width: 300,
        //    //height:25,
        //    max: 20,
        //    delay: 100,
        //    minLength: 1,
        //    autoFocus: true,
        //    cacheLength: 1,
        //    scroll: true,
        //    highlight: false,
        //    select: function (event, ui) {
        //        $('#txtStoryName-bc').val(ui.item.Story);
        //    }
        //});

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                id: item.ID
            }
        });

        $(document).on('focus.autocomplete', "input:text[id^='txtUnit-Bureau_']", function () {
            $(this).autocomplete({
                source: finalDataShowUnit,
                width: 300,
                //height:250,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    var index = this.id.split("_")[1];
                    if (!!ui.item.title) {
                        $('#txtUnit-Bureau_' + index).val(ui.item.label);
                        $('#txtBucode-Bureau_' + index).val(ui.item.title);
                        $('#txtUnit-Bureau_' + index).attr('txtUnit-Bureau_id_' + index, ui.item.id);
                    }
                    else {
                        $('#txtBucode-Bureau_' + index).val('');
                        $('#txtUnit-Bureau_' + index).attr('txtUnit-Bureau_' + index, '');
                    }
                },
                focus: function (event, ui) {
                    $(this).closest('.BRC-cols-showunit').find('input').last().val('');
                },
                search: function (event, ui) {
                    var searchIndex = $(this).closest('.BRC-cols-showunit').find('input').attr('id').split("_")[1];
                    $(this).closest('.BRC-cols-showunit').find('input').last().val('');
                    $('#txtUnit-Bureau_' + searchIndex).attr('txtUnit-Bureau_id_' + searchIndex, "");
                }
            });
        });

        $('#BCrequestermobile, #BCrequesterdesk').prev().keydown(function (e) {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });

        $('#BureauCamera .BRC-button-add-app').click(function () {
            $('#BureauCamera .BRC-button-add-app').prev().show();
            $(this).hide();
        });
        $('#BureauCamera .button-remove-sp-bc').click(function () {
            $(this).closest('.form-group').hide();
            $('#BureauCamera .BRC-button-add-app').show();
            var ppobject = SPClientPeoplePicker.SPClientPeoplePickerDict['peoplePickerAdditionalUsersbcDiv_TopSpan'];
            var usersobject = ppobject.GetAllUserInfo();
            usersobject.forEach(function (index) {
                ppobject.DeleteProcessedUser(usersobject[index]);
            });
        });

        $("#meettime-hr-bc, #rolltime-hr-bc, #endtime-hr-bc").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
        });

        $("#meettime-min-bc, #rolltime-min-bc, #endtime-min-bc").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
        });

    }
};
NBCU.CrewRequest.BureauCamera.prototype.PostBack = false;