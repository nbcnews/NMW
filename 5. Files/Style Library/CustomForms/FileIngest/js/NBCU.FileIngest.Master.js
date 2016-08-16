NBCU.FileIngest.Master = function () {
    this.requestPage = {
        Summary: "Summary",
        Device: "Device",
        Additional: "Additional",
        Submit: "Submit"
    };

    /** Redirect to the page as per user action **/
    this.redirectPage = function (page) {
        switch (page) {
            case requestPage.Summary:
                NBCU.FileIngest.Summary.PostBack = false;
                Summary_page = new NBCU.FileIngest.Summary();
                Summary_page.Init();
                $('.page-section').hide();
                $("#FLN-Summary-page").show();
                $('.FLNNav li').removeClass('active-inprogress').removeClass('active')
                $('.FLNNav li:eq(0)').addClass('active-inprogress');
                break;
            case requestPage.Device:
                NBCU.FileIngest.Device.PostBack = false;
                Device_page = new NBCU.FileIngest.Device();
                Device_page.Init();
                $('.page-section').hide();
                $("#FLN-Device-Camera").show();
                $('.FLNNav li').removeClass('active-inprogress').removeClass('active');
                $('.FLNNav li:eq(0)').addClass('active');
                $('.FLNNav li:eq(1)').addClass('active-inprogress');
                break;
            case requestPage.Additional:
                NBCU.FileIngest.Additional.PostBack = false;
                Additional_page = new NBCU.FileIngest.Additional();
                Additional_page.Init();
                $('.page-section').hide();
                $("#FLN-Additional").show();
                $('.FLNNav li').removeClass('active-inprogress').removeClass('active');
                $('.FLNNav li:eq(0)').addClass('active');
                $('.FLNNav li:eq(1)').addClass('active');
                $('.FLNNav li:eq(2)').addClass('active-inprogress');
                break;
            case requestPage.Submit:
                $('#thanksScreen').show();
                $('.FLNNav li').removeClass('active-inprogress').removeClass('active');
                $('.FLNNav li:eq(0)').addClass('active');
                $('.FLNNav li:eq(1)').addClass('active');
                $('.FLNNav li:eq(2)').addClass('active');
                $('.FLNNav li:eq(3)').addClass('active-inprogress');
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
        NBCU.FileIngest.Helper.requestorKey = userObject.get_loginName();
        $('#FLN-summary-contact').val(Phone);
        $('#FLN-summary-contact').next().text(Phone);
        $('#FLN-summary-email').val(Email);
        $('#FLN-summary-email').next().text(Email);
        $('#FLN-summary-requester').text(userObject.get_title());
    }
    this.onFailureMethod = function (sender, args) {
        console.log('request failed ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    /* ------------- Init ------------------------ */
    this.init = function () {
        redirectPage(requestPage.Summary);
        ExecuteOrDelayUntilScriptLoaded(getWebUserData, "sp.js");
        NBCU.FileIngest.Helper.initializePeoplePicker('peoplePickerProducerFLNDiv', false);
        NBCU.FileIngest.Helper.initializePeoplePicker('peoplePickerApproverFLNDiv', false);
        var showUnitData = NBCU.FileIngest.Helper.ReadList("/sites/NMWF", "ShowUnit", "?select=ShowUnitTitle,DefaultBudgetCode,ID,Business");

        $("span[title='Back']").click(function () {
            redirectPage($(this).attr('action'));
        });

        //$("span[title='Next']").click(function () {
        //    redirectPage($(this).attr('action'));
        //});

        $("span[title='Submit']").click(function () {
            redirectPage($(this).attr('action'));
        });

        $(document).on("click", '.FLNNav li.active', function () {
            redirectPage($(this).children().first().attr('action'));
        });

        $(document).on("click", '.removebutton', function () {
            $('.removebutton:eq(0)').closest('.row').parent().remove()
        });

        $(document).on("click", '.fi-removebutton', function () {
            $(this).closest('.mainrow').remove();
        });

        $('#FLN-Summary-page .button-edit-New-summary').click(function () {
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

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                Business: item.Business,
                id: item.ID
            }
        });

        $(document).on("click", '.FLN-summary-showunit', function () {
            $(this).autocomplete({
                source: finalDataShowUnit,
                width: 300,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    if (event.target.className.indexOf('FLN-summary-showunit') != -1) {
                        $(this).closest('.FLN-summary-form-group-show-unit').next().find('input').val(ui.item.title);
                    }
                },
                focus: function (event, ui) {
                    if (event.target.className.indexOf('FLN-summary-showunit') != -1) {
                        $(this).closest('.FLN-summary-form-group-show-unit').next().find('input').val("");
                    }
                },
                search: function (event, ui) {
                    if (event.target.className.indexOf('FLN-summary-showunit') != -1) {
                        $(this).closest('.FLN-summary-form-group-show-unit').next().find('input').val("");
                    }
                }
            });
        });
        // Date Picker Load 
        $('#FLN-summary-airdate').dateRangePicker({
            inline: true,
            mode: 'single',
            container: '.calender-conatainer-FLNairdate',
            alwaysOpen: false,
            singleMonth: true,
            stickyMonths: true,
            autoClose: true,
            singleDate: true,
            getValue: function () {
                return this.innerHTML;
            },
            setValue: function (s1) {
                $('#FLN-summary-txtairdate').val(s1);
            }
        }).bind('datepicker-change', function (event, obj) {
            $('#FLN-airdateTBD').prop('checked', false)
        });

        $('#FLN-dateneed-airdate').dateRangePicker({
            inline: true,
            mode: 'single',
            container: '.calender-conatainer-FLNdateneed',
            alwaysOpen: false,
            singleMonth: true,
            stickyMonths: true,
            autoClose: true,
            singleDate: true,
            getValue: function () {
                return this.innerHTML;
            },
            setValue: function (s1) {
                $('#FLN-dateneed-txtairdate').val(s1);
            }
        }).bind('datepicker-change', function (event, obj) {
            $('#FLN-summary-asap').prop('checked', false)
        });
    }

    return {
        Init: init,
        redirectPage: this.redirectPage
    }

}();
$(document).ready(NBCU.FileIngest.Master.Init);