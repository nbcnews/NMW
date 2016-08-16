NBCU.EditRequest.Master = function () {
    this.requestPage = {
        EditSummary: "EditSummary",
        EditCraft: "EditCraft",
        EditProducer: "EditProducer",
        MSNBCShort: "MSNBC SHORT FORM",
        TDYWTDY: "Tdy/Wtdy am form",
        LongSummary: "LongSummary",
        LongCraft: "LongCraft",
        LongProducer: "LongProducer",
        LongEditor: "LongEditor",
        EditRequestForm: "Edit Request",
        MSNBCShortForm: "MSNBC Short Form Edit Request",
        TDYWTDYAMForm: "TDY/WTDY AM Form Edit Request",
        LongForm: "Long Form Edit Request",
        LongSubmit: "LongSubmit"
    };

    this.redirectTab = function (tab) {
        switch (tab) {
            case requestPage.EditRequestForm:
                $('#welcomeScreen').hide();
                $('.wrapper').hide();
                $("#EditRequest").show();
                redirectPage(requestPage.EditSummary);
                $('.content-container').addClass('active-mobile');
                $('.nav-button').addClass('active-mobile');
                break;
            case requestPage.MSNBCShortForm:
                $('#welcomeScreen').hide();
                $('.wrapper').hide();
                $("#EditRequest-MSNBC").show();
                redirectPage(requestPage.MSNBCShort);
                $('.content-container').addClass('active-mobile');
                $('.nav-button').addClass('active-mobile');

                break;
            case requestPage.TDYWTDYAMForm:
                $('#welcomeScreen').hide();
                $('.wrapper').hide();
                $("#EditRequest-tdy-wtdy").show();
                redirectPage(requestPage.TDYWTDY);
                $('.content-container').addClass('active-mobile');
                $('.nav-button').addClass('active-mobile');
                break;
            case requestPage.LongForm:
                $('#welcomeScreen').hide();
                $('.wrapper').hide();
                $("#EditLongformRequest").show();
                redirectPage(requestPage.LongSummary);
                $('.content-container').addClass('active-mobile');
                $('.nav-button').addClass('active-mobile');
                break;
            default:
                break;
        }
    }
    /** Redirect to the page as per user action **/
    this.redirectPage = function (page) {
        switch (page) {
            case requestPage.EditSummary:
                NBCU.EditRequest.EditSummary.PostBack = false;
                EditSummary_page = new NBCU.EditRequest.EditSummary();
                EditSummary_page.Init();
                $('.page-section').hide();
                $("#edr-Summary-page").show();
                $('.edrNav li').removeClass('active-inprogress').removeClass('active')
                $('.edrNav li:eq(0)').addClass('active-inprogress');
                break;
            case requestPage.EditCraft:
                NBCU.EditRequest.EditCraft.PostBack = false;
                EditCraft_page = new NBCU.EditRequest.EditCraft();
                EditCraft_page.Init();
                $('.page-section').hide();
                $("#edr-Craft-page").show();
                $('.edrNav li').removeClass('active-inprogress').removeClass('active');
                $('.edrNav li:eq(0)').addClass('active');
                $('.edrNav li:eq(1)').addClass('active-inprogress');
                break;
            case requestPage.EditProducer:
                NBCU.EditRequest.EditProducer.PostBack = false;
                EditProducer_page = new NBCU.EditRequest.EditProducer();
                EditProducer_page.Init();
                $('.page-section').hide();
                $("#edr-Producer-page").show();
                $('.edrNav li').removeClass('active-inprogress').removeClass('active');
                $('.edrNav li:eq(0)').addClass('active');
                if ($('#edr-summary-CraftEditor').val() == "Yes") {
                    $('.edrNav li:eq(1)').addClass('active');
                }
                $('.edrNav li:eq(2)').addClass('active-inprogress');
                break;
            case requestPage.MSNBCShort:
                NBCU.EditRequest.MSNBCShort.PostBack = false;
                MSNBCShort_page = new NBCU.EditRequest.MSNBCShort();
                MSNBCShort_page.Init();
                $('.page-section').hide();
                $("#edr-msnbc-shortform-page").show();
                $('.MSNBCNav li').removeClass('active-inprogress').removeClass('active');
                $('.MSNBCNav li:eq(0)').addClass('active-inprogress');
                break;
            case requestPage.TDYWTDY:
                NBCU.EditRequest.TDYWTDY.PostBack = false;
                TDYWTDY_page = new NBCU.EditRequest.TDYWTDY();
                TDYWTDY_page.Init();
                $('.page-section').hide();
                $("#edr-tdy-wtdy-page").show();
                $('.tdyNav li').removeClass('active-inprogress').removeClass('active');
                $('.tdyNav li:eq(0)').addClass('active-inprogress');
                break;
            case requestPage.LongSummary:
                NBCU.EditRequest.LongSummary.PostBack = false;
                LongSummary_page = new NBCU.EditRequest.LongSummary();
                LongSummary_page.Init();
                $('.page-section').hide();
                $("#edr-LNGF-Summary-page").show();
                $('.edrLNGFNav li').removeClass('active-inprogress').removeClass('active');
                $('.edrLNGFNav li:eq(0)').addClass('active-inprogress');
                //$('.edrLNGFNav li:eq(0)').addClass('active-inprogress');
                break;
            case requestPage.LongCraft:
                NBCU.EditRequest.LongCraft.PostBack = false;
                LongCraft_page = new NBCU.EditRequest.LongCraft();
                LongCraft_page.Init();
                $('.page-section').hide();
                $("#edr-LNGF-Craft-page").show();
                $('.edrLNGFNav li').removeClass('active-inprogress').removeClass('active');
                $('.edrLNGFNav li:eq(0)').addClass('active');
                $('.edrLNGFNav li:eq(1)').addClass('active-inprogress');
                break;
            case requestPage.LongProducer:
                NBCU.EditRequest.LongProducer.PostBack = false;
                LongProducer_page = new NBCU.EditRequest.LongProducer();
                LongProducer_page.Init();
                $('.page-section').hide();
                $("#edr-LNGF-Producer-page").show();
                $('.edrLNGFNav li').removeClass('active-inprogress').removeClass('active');
                $('.edrLNGFNav li:eq(0)').addClass('active');
                if ($('#edr-LGNF-CDR').val() == "Yes") {
                    $('.edrLNGFNav li:eq(1)').addClass('active');
                }
                $('.edrLNGFNav li:eq(2)').addClass('active-inprogress');
                break;
            case requestPage.LongEditor:
                NBCU.EditRequest.LongEditor.PostBack = false;
                LongEditor_page = new NBCU.EditRequest.LongEditor();
                LongEditor_page.Init();
                $('.page-section').hide();
                $("#edr-LNGF-Assistance-Editor-page").show();
                $('.edrLNGFNav li').removeClass('active-inprogress').removeClass('active');
                $('.edrLNGFNav li:eq(0)').addClass('active');
                if ($('#edr-LGNF-CDR').val() == "Yes") {
                    $('.edrLNGFNav li:eq(1)').addClass('active');
                }
                if ($('#edr-LGNF-PDR').val() == "Yes") {
                    $('.edrLNGFNav li:eq(2)').addClass('active');
                }
                $('.edrLNGFNav li:eq(3)').addClass('active-inprogress');
                break;
            case requestPage.LongSubmit:
                $('.edrLNGFNav li:eq(0)').addClass('active');
                if ($('#edr-LGNF-CDR').val() == "Yes") {
                    $('.edrLNGFNav li:eq(1)').addClass('active');
                }
                if ($('#edr-LGNF-PDR').val() == "Yes") {
                    $('.edrLNGFNav li:eq(2)').addClass('active');
                }
                if ($('#edr-LGNF-APDR').val() == "Yes") {
                    $('.edrLNGFNav li:eq(3)').addClass('active');
                }
                $('#thanksScreen').show();
                if (NBCU.EditRequest.Helper.labelSelection == "Edit Request" || NBCU.EditRequest.Helper.labelSelection == "Long Form Edit Request") {
                    $('.emailText').show();
                }
                $('.thanks-edit-request').addClass('thanks-hide');
                $('.thanks-Long-Form-Edit-request').addClass('thanks-show');
                break;
            default:
                break;
        }
    };

    function getWebUserData() {
        SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function () {
            context = new SP.ClientContext.get_current();
            web = context.get_web();
            currentUser = web.get_currentUser();
            currentUser.retrieve();
            peopleManager = new SP.UserProfiles.PeopleManager(context);
            personProperties = peopleManager.getMyProperties();
            context.load(web);
            context.load(personProperties);
            context.executeQueryAsync(Function.createDelegate(this, this.onSuccessMethod), Function.createDelegate(this, this.onFailureMethod));
        });
    }
    this.onSuccessMethod = function (sender, args) {
        var userObject = web.get_currentUser();
        var Phone = personProperties.get_userProfileProperties()['WorkPhone'];
        var Email = personProperties.get_userProfileProperties()['WorkEmail'];
        NBCU.EditRequest.Helper.requestorKey = userObject.get_loginName();
        $('#edr-summary-contact, #edr-LNGF-summary-contact, #edr-msnbc-shortform-contact, #edr-tdy-wtdy-contact').val(Phone);
        $('#edr-summary-contact, #edr-LNGF-summary-contact, #edr-msnbc-shortform-contact, #edr-tdy-wtdy-contact').next().text(Phone);
        $('#edr-summary-email, #edr-LNGF-summary-email, #edr-msnbc-shortform-email, #edr-tdy-wtdy-email').val(Email);
        $('#edr-summary-email, #edr-LNGF-summary-email, #edr-msnbc-shortform-email, #edr-tdy-wtdy-email').next().text(Email);
        $('.display-data1-edr-summary-signin, .display-data1-edr-LNGF-summary-signin, .display-data1-edr-msnbc-shortform-signin, .display-data1-edr-tdy-wtdy-signin').text(userObject.get_title());
    }
    this.onFailureMethod = function (sender, args) {
        console.log('request failed ' + args.get_message() + '\n' + args.get_stackTrace());
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

    /* ------------- Init ------------------------ */
    this.init = function () {
        ExecuteOrDelayUntilScriptLoaded(getWebUserData, "sp.js");
        //Edit Summary
        NBCU.EditRequest.Helper.initializePeoplePicker('peoplePickerProducerEDRDiv', false);
        NBCU.EditRequest.Helper.initializePeoplePicker('peoplePickerApproverEDRDiv', false);
        //Long Summary
        NBCU.EditRequest.Helper.initializePeoplePicker('peoplePickerProduceredr_LNGFDiv', false);
        NBCU.EditRequest.Helper.initializePeoplePicker('peoplePickerSeniorProduceredr_LNGFDiv', false);
        NBCU.EditRequest.Helper.initializePeoplePicker('peoplePickerassistantProduceredr_LNGFDiv', false);
        var showUnitData = NBCU.EditRequest.Helper.ReadList("/sites/NMWF", "ShowUnit", "?select=ShowUnitTitle,DefaultBudgetCode,ID,Business");
        //display-dataform-edr-summary-producer

        $('.label').click(function () {
            redirectTab($(this).attr('title'));
            NBCU.EditRequest.Helper.labelSelection = $(this).attr('title');
        });

        $('.button-welcome').click(function () {
            $('#welcomeScreen').show();
        });

        $("span[title='Back']").click(function () {
            redirectPage($(this).attr('action'));
        });

        $("span[title='Next']").click(function () {
            redirectPage($(this).attr('action'));
        });

        $(document).on("click", ".icon-close", function () {
            $(this).parent().remove();
        });

        $(document).on("click", '.edrLNGFNav li.active, .edrNav li.active', function () {
            redirectPage($(this).children().first().attr('action'));
        });

        var dummayArr = [];
        $("#edr-summary-storyname").autocomplete({
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
                        $("#edr-summary-storyname").autocomplete("option", { source: storyData });
                    }
                });
            }
        });

        $('#edr-Summary-page .button-edit-New-summary, #edr-LNGF-Summary-page .button-edit-New-summary, #edr-msnbc-shortform-page .button-edr-msnbc-shortform, #edr-tdy-wtdy-page .button-edr-tdy-wtdy').click(function () {
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
        });

        $('.button-close').click(function () {
            if ($(window).width() >= 1200) {
                $('#thanksScreen').hide();
                $('#thanksScreen').addClass('popupscreen-thanks');
                $('body').removeClass('overflow');
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
            }
            else {
                window.location.href = "/Pages/home.aspx";
            }
        })

        $('#edr-summary-contact, #edr-LNGF-summary-contact, #edr-msnbc-shortform-contact, #edr-tdy-wtdy-contact').keydown(function (e) {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });


        $("#edr-craftHours, #edr-PE-ET-Hours, #edr-LGNF-hours, #edr-LNGF-PE-length-Hours, #edr-LNGF-PE-EP-Hours, #edr-LNGF-AEE-Length-Hours, #edr-LNGF-AEE-AssEditor-Hours").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $("#edr-PieceMinutes, #edr-craftMinutes, #edr-PE-Minutes, #edr-PE-ET-Minutes, #edr-PieceSeconds, #edr-PE-Seconds, #edr-LNGF-CE-Length-Minutes, #edr-LNGF-CE-Length-Seconds, #edr-LNGF-PE-length-Minutes, #edr-LNGF-PE-EP-Minutes, #edr-LNGF-AEE-Length-Minutes").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                Business: item.Business,
                id: item.ID
            }
        });

        var msnbcDataShowUnit = $.grep(finalDataShowUnit, function (a) {
            return a.Business == "MSNBC";
        });

        $('#edr-msnbc-shrtfrm-showunit').find('option:not(:first)').remove();
        $.each(msnbcDataShowUnit, function (index, data) {
            $('#edr-msnbc-shrtfrm-showunit').append('<option id="' + data.id + '">' + data.label + '</option>');
        });

        $('#edr-msnbc-shrtfrm-showunit').change(function () {
            var budCode = "",showunit = $(this).val();
            var budArr = $.grep(msnbcDataShowUnit,function(a){
                return a.value ==showunit;
            })
            if (budArr.length >0) {
                budCode = budArr[0].title
            }
            $('#edr-msnbc-shortform-budgetcode_0').val(budCode)
        })

        var nbcNewsDataShowUnit = $.grep(finalDataShowUnit, function (a) {
            return a.Business == "NBC News";
        });

        $(document).on("click", '#edr-LNGF-summary-showunit', function () {
            $(this).autocomplete({
                source: nbcNewsDataShowUnit,
                width: 300,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    $('#edr-LNGF-summary-budgetcode_0').val(ui.item.title);
                },
                focus: function (event, ui) {
                    $(this).closest('.cols-12').find('input').last().val('');
                },
                search: function (event, ui) {
                    $(this).closest('.cols-12').find('input').last().val('');
                }
            });
        });
        var finaltdy = [
               "Today Show Early Morning Showside",
                "Today News",
                "Weekend Today Early Morning Showside",
                "Weekend Today News"
        ];
        $(document).on("click", '#edr-tdy-shrtfrm-showunit', function () {
            $(this).autocomplete({
                source: finaltdy,
                width: 300,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    //$('#edr-msnbc-shortform-budgetcode_0').val(ui.item.title);
                }
            });
        });

        var noDatelineShowUnit = $.grep(finalDataShowUnit, function (a) {
            return a.value != "Dateline";
        });

        $(document).on("click", '.edr-summary-showunit', function () {
            $(this).autocomplete({
                source: noDatelineShowUnit,
                width: 300,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    if (event.target.className.indexOf('edr-summary-showunit') != -1) {
                        $(this).closest('.edr-summary-form-group-show-unit').next().find('input').val(ui.item.title);
                        $(this).attr('network', ui.item.Business);
                    }
                    else if (event.target.id == "edr-LNGF-summary-showunit") {
                        $('#edr-LNGF-summary-budgetcode_0').val(ui.item.title);
                    }
                },
                focus: function (event, ui) {
                    if (event.target.className.indexOf('edr-summary-showunit') != -1) {
                        $(this).closest('.cols-7').find('input').last().val('');
                        $(this).attr('network', '');
                    }
                    else if (event.target.id == "edr-LNGF-summary-showunit") {
                        $(this).closest('.cols-12').find('input').last().val('');
                    }
                },
                search: function (event, ui) {
                    if (event.target.className.indexOf('edr-summary-showunit') != -1) {
                        $(this).closest('.cols-7').find('input').last().val('');
                        $(this).attr('network', '');
                    }
                    else if (event.target.id == "edr-LNGF-summary-showunit") {
                        $(this).closest('.cols-12').find('input').last().val('');
                    }
                }
            });
        });
        // Date Picker Load 
        //General Edit Summary
        $('#edr-summary-airdate').dateRangePicker({
            inline: true,
            mode: 'single',
            container: '.calender-conatainer-airdate',
            alwaysOpen: false,
            singleMonth: true,
            stickyMonths: true,
            autoClose: true,
            singleDate: true,
            getValue: function () {
                return this.innerHTML;
            },
            setValue: function (s1) {
                $('#edr-summary-txtairdate').val(s1);
            }
        }).bind('datepicker-change', function (event, obj) {
            $('#edr-summary-airdateTBD').prop('checked', false)
        });
        //General Edit Craft
        datePickerLoad($('#edr-summary-start-date'), '.calender-conatainer-edr-summary', $('.edr-summary-startdate'));
        //Long Form ASSISTANT EDITOR EDIT
        datePickerLoad($('#edr-LNGF-ass-date-need'), '.calender-conatainer-edr-LNGF-assdateneeded', $('.edr-LNGF-ass-dateneeded'));
        //Long Craft
        datePickerLoad($('#edr-LNGF-craft-start-date'), '.calender-conatainer-LNGF-craftairdate', $('.edr-LNGF-craft-startdate'));
        datePickerLoad($('#edr-LNGF-summary-start-date-estimate'), '.calender-conatainer-edr-LNGF-estimate', $('.edr-LNGF-estimate-startdate'));
        datePickerLoad($('#edr-LNGF-craft-start-date-screen'), '.calender-conatainer-edr-LNGF-craft-start-date-screen', $('.edr-LNGF-craft-start-date-screen'));
        //Long Form Summary
        $('#edr-LNGF-summary-airdate').dateRangePicker({
            inline: true,
            mode: 'single',
            container: '.calender-conatainer-LNGFairdate',
            alwaysOpen: false,
            singleMonth: true,
            stickyMonths: true,
            autoClose: true,
            singleDate: true,
            getValue: function () {
                return this.innerHTML;
            },
            setValue: function (s0) {
                $('#edr-LNGF-summary-txtairdate').val(s0);
            }
        }).bind('datepicker-change', function (event, obj) {
            $('#edr-LNGF-airdate').prop('checked', false)
        });
        //MSNBC Short Form
        $('#edr-msnbc-shortform-airdate').dateRangePicker({
            inline: true,
            mode: 'single',
            container: '.calender-conatainer-edr-msnbc-shortform',
            alwaysOpen: false,
            singleMonth: true,
            stickyMonths: true,
            autoClose: true,
            singleDate: true,
            getValue: function () {
                return this.innerHTML;
            },
            setValue: function (s0) {
                $('#edr-msnbc-shortform-txtairdate').val(s0);
            }
        }).bind('datepicker-change', function (event, obj) {
            $('#edr-msnbc-shortform-tbd').prop('checked', false)
        });
        //TDY/WTDY Form Date Picker Load
        datePickerLoad($('#edr-tdy-amform-airdate'), '.calender-conatainer-edr-tdy-amform', $('#edr-tdy-amform-txtairdate'));
    }

    return {
        Init: init,
        redirectPage: this.redirectPage
    }

}();
$(document).ready(NBCU.EditRequest.Master.Init);