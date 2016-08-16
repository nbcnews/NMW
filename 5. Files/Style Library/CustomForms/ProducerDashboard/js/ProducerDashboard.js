var finalmyCrewData = [], filtermyCrewData = [];
var finalmyEditData = [], filtermyEditData = [];
var finalmyFileIngestData = [], filtermyFileIngestData = [];
var finalAllCrewData = [], filterAllCrewData = [];
var finalAllFileIngestData = [], filterAllFileIngestData = [];
var finalAllEditData = [], filterAllEditData = [];
var finalMSNBCData = [], filterMSNBCData = [];
var finalTDYData = [], filterTDYData = [];
var loginName = "";
var gridWidth = parseInt($('.dashboard-tab').width()) - 20;
$(function () {
    $('.myrequest-clear').click(function () {
        $('#hierarchy-myrequest').text("Shows");
        $('.myrequest-dateselect .date-value:eq(0)').text("");
        $('.myrequest-dateselect .date-value:eq(1)').text("");
        $('.myrequest-date').data('dateRangePicker').clear();
        $('.myrequest-dateselect').hide();
        loadGrid($('#MyCrewGrid'), finalmyCrewData);
        loadGrid($('#MyEditGrid'), finalmyEditData);
        loadGrid($('#MyFileIngestGrid'), finalmyFileIngestData);
    });
    $('#myReqgrid-searchItem').keyup(function () {
        var textEntered = $(this).val();
        var loadData = [];
        if (!!textEntered) {
            if ($('#accordion .ui-accordion-content-active').hasClass('accordion-content-my-crew')) {
                if (filtermyCrewData.length > 0) {
                    loadData = $.grep(filtermyCrewData, function (a) {
                        return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CrewRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.RequestStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.StartDate1.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.EndDate1.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ShootStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.AssignmentSlug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.StoryName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Talent.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewShowUnit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewBudgetCode.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewResName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewResRole.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SuggestedResources.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SelectedResources.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Approval.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CrewAddress.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Requester.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Producer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Approver.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Created.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Modified.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ModifiedBy.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                    })
                }
                else {
                    loadData = $.grep(finalmyCrewData, function (a) {
                        return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CrewRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.RequestStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.StartDate1.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.EndDate1.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ShootStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.AssignmentSlug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.StoryName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Talent.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewShowUnit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewBudgetCode.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewResName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.myCrewResRole.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SuggestedResources.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SelectedResources.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Approval.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CrewAddress.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Requester.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Producer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Approver.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Created.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Modified.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ModifiedBy.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                    })
                }
                loadGrid($('#MyCrewGrid'), loadData);
            }
            else if ($('#accordion .ui-accordion-content-active').hasClass('accordion-content-my-edit')) {
                if (filtermyEditData.length > 0) {
                    loadData = $.grep(filtermyEditData, function (a) {
                        return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.status.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.EditStartDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.AirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ShowUnit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CraftEditDays.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CraftEditHours.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CraftEditMinutes.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Editor.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Room.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Created.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Modified.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ModifiedBy.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                    })
                }
                else {
                    loadData = $.grep(finalmyEditData, function (a) {
                        return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.status.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.EditStartDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.AirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ShowUnit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CraftEditDays.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CraftEditHours.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CraftEditMinutes.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Editor.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Room.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Created.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Modified.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ModifiedBy.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                    })
                }
                loadGrid($('#MyEditGrid'), loadData);
            }
            else if ($('#accordion .ui-accordion-content-active').hasClass('accordion-content-my-fileingest')) {
                if (filtermyFileIngestData.length > 0) {
                    loadData = $.grep(filtermyFileIngestData, function (a) {
                        return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.FileIngestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.status.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ShowUnit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Workgroup.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Device.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Quantity.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CameraType.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Created.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 
                    })
                }
                else {
                    loadData = $.grep(finalmyFileIngestData, function (a) {
                        return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.FileIngestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.status.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ShowUnit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Workgroup.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Device.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Quantity.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.CameraType.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                            a.Created.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                    })
                }
                loadGrid($('#MyFileIngestGrid'), loadData);
            }
        }
        else {
            filterMyRequest();
            if (filtermyCrewData.length == 0) {
                loadGrid($('#MyCrewGrid'), finalmyCrewData);
            }
            else {
                loadGrid($('#MyCrewGrid'), filtermyCrewData);
            }
            if (filtermyEditData.length == 0) {
                loadGrid($('#MyEditGrid'), finalmyEditData);
            }
            else {
                loadGrid($('#MyEditGrid'), filtermyEditData);
            }
            if (filtermyFileIngestData.length == 0) {
                loadGrid($('#MyFileIngestGrid'), finalmyFileIngestData);
            }
            else {
                loadGrid($('#MyFileIngestGrid'), filtermyFileIngestData);
            }
        }
    });

    $('.myrequest-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-container-myrequest',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            $('.myrequest-dateselect').show();
            $('.myrequest-dateselect .date-value:eq(0)').text(s1);
            $('.myrequest-dateselect .date-value:eq(1)').text(s2);
            filterMyRequest();
        }
    });

    $('.crewrequest-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-container-crewrequest',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            $('.crewrequest-dateselect').show();
            $('.crewrequest-dateselect .date-value:eq(0)').text(s1);
            $('.crewrequest-dateselect .date-value:eq(1)').text(s2);
            //filterContraint();
            //if (filterEditRequestData.length > 0) {
            //    filterEditRequestData = $.grep(filterEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
            //else {
            //    filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
        }
    });

    $('.editrequest-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-container-editrequest',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            $('.editrequest-dateselect').show();
            $('.editrequest-dateselect .date-value:eq(0)').text(s1);
            $('.editrequest-dateselect .date-value:eq(1)').text(s2);
            //filterContraint();
            //if (filterEditRequestData.length > 0) {
            //    filterEditRequestData = $.grep(filterEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
            //else {
            //    filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
        }
    });

    $('.fileIngestrequest-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-container-fileIngestrequest',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            $('.fileIngestrequest-dateselect').show();
            $('.fileIngestrequest-dateselect .date-value:eq(0)').text(s1);
            $('.fileIngestrequest-dateselect .date-value:eq(1)').text(s2);
            //filterContraint();
            //if (filterEditRequestData.length > 0) {
            //    filterEditRequestData = $.grep(filterEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
            //else {
            //    filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
        }
    });

    $('.reports-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-container-reports',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            $('.reports-dateselect').show();
            $('.reports-dateselect .date-value:eq(0)').text(s1);
            $('.reports-dateselect .date-value:eq(1)').text(s2);
            //filterContraint();
            //if (filterEditRequestData.length > 0) {
            //    filterEditRequestData = $.grep(filterEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
            //else {
            //    filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            //        return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
            //            dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
            //    });
            //    loadGrid($('#EditRequestGrid'), filterEditRequestData);
            //}
        }
    });

    $(document).on("click", ".fiEdit", function () {
        openBasicDialog("/sites/bcast_prodreq/Pages/FileIngest-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
    });

    $(document).on("click", ".crewEdit", function () {
        openBasicDialog("/sites/bcast_prodreq/Pages/fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
    });
    $(document).on("click", ".editEdit", function () {
        if ($(this).closest('tr').children().eq(2).text() == "Edit Request") {
            openBasicDialog("/sites/bcast_prodreq/Pages/ER-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
        }
        else if ($(this).closest('tr').children().eq(2).text() == "Long Form Edit Request") {
            openBasicDialog("/sites/bcast_prodreq/Pages/LF-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
        }
        else if ($(this).closest('tr').children().eq(2).text() == "MSNBC Short Form") {
            openBasicDialog("/sites/bcast_prodreq/Pages/MSNBC-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
        }
        else if ($(this).closest('tr').children().eq(2).text() == "TDY/WTDY AM Form") {
            openBasicDialog("/sites/bcast_prodreq/Pages/TdyWtdy-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
        }
    });

    $('#hierarchy-myrequest').click(function () {
        $('#show-items-myrequest').addClass('active');
        return false;
    });
    $('#hierarchy-crewrequest').click(function () {
        $('#show-items-crewrequest').addClass('active');
        return false;
    });
    $('#hierarchy-editrequest').click(function () {
        $('#show-items-editrequest').addClass('active');
        return false;
    });
    $('#hierarchy-fileingestrequest').click(function () {
        $('#show-items-fileingestrequest').addClass('active');
        return false;
    });
    $(document).click(function () {
        $('#show-items-myrequest').removeClass('active');
        $('#show-items-crewrequest').removeClass('active');
        $('#show-items-editrequest').removeClass('active');
        $('#show-items-fileingestrequest').removeClass('active');
    });
    $('#show-items-myrequest li').click(function () { //button click class name is myDiv
        $('#hierarchy-myrequest').text("");
        $('#hierarchy-myrequest').text($(this).find('a').first().text());
        $('#show-items-myrequest').removeClass('active');
        filterMyRequest();
        return false;
    });
    $('#show-items-crewrequest li').click(function () { //button click class name is myDiv
        $('#hierarchy-crewrequest').text("");
        $('#hierarchy-crewrequest').text($(this).find('a').first().text());
        $('#show-items-crewrequest').removeClass('active');
        return false;
    });
    $('#show-items-editrequest li').click(function () { //button click class name is myDiv
        $('#hierarchy-editrequest').text("");
        $('#hierarchy-editrequest').text($(this).find('a').first().text());
        $('#show-items-editrequest').removeClass('active');
        return false;
    });
    $('#show-items-fileingestrequest li').click(function () { //button click class name is myDiv
        $('#hierarchy-fileingestrequest').text("");
        $('#hierarchy-fileingestrequest').text($(this).find('a').first().text());
        $('#show-items-fileingestrequest').removeClass('active');
        return false;
    });

    $('#das-Report').click(function () {
        if (finalMSNBCData.length == 0 && finalTDYData.length == 0) {
            loadAllReportData();
        }
    });

    $('#das-FIR').click(function () {
        if (finalAllFileIngestData.length == 0) {
            loadAllFileIngestData();
        }
    });

    $('#das-ER').click(function () {
        if (finalAllEditData.length == 0) {
            loadAllEditData();
        }
    });

    $('#das-CR').click(function () {
        if (finalAllCrewData.length == 0) {
            loadAllCrewData();
        }
    });

    $('.accordion-title-myedit').click(function () {
        if (finalmyEditData.length == 0) {
            loadMyEditData(loginName);
            filterMyRequest();
        }
    });

    $('.accordion-title-myfileingest').click(function () {
        if (finalmyFileIngestData.length == 0) {
            loadMyFileIngestData(loginName);
            filterMyRequest();
        }
    });

    $('.tab-li').click(function () {
        $('.tab-li').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').removeClass('active');
        $('.tab-content:eq(' + $('.tab-li').index($(this)) + ')').addClass('active');
    });

    $("#accordion, #accordion-report").accordion({
        heightStyle: "content",
        collapsible: true,
    });
    $('.producer-dashboard-newCrewRequest').click(function () {
        if ($(window).width() >= 1200) {
            openBasicDialog("/sites/bcast_prodreq/Pages/Crew-Request.aspx", " ");
        }
        else {
            location.href = "/sites/bcast_prodreq/Pages/Crew-Request.aspx";
        }
    });

    $('.producer-dashboard-newEditRequest').click(function () {
        if ($(window).width() >= 1200) {
            openBasicDialog("/sites/bcast_prodreq/Pages/Edit-Request.aspx", " ");
        }
        else {
            location.href = "/sites/bcast_prodreq/Pages/Edit-Request.aspx";
        }
    });

    $('.producer-dashboard-newFileIngest').click(function () {
        if ($(window).width() >= 1200) {
            openBasicDialog("/sites/bcast_prodreq/Pages/File-Ingest.aspx", " ");
        }
        else {
            location.href = "/sites/bcast_prodreq/Pages/File-Ingest.aspx";
        }
    });

    $(document).on("click", ".copyIcon", function () {
        copyToClipboard($(this));
    });

    var userid = _spPageContextInfo.userId;
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
    var requestHeaders = { "accept": "application/json;odata=verbose" };
    $.ajax({
        url: requestUri,
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        success: onSuccess,
        error: onError
    });
    function onSuccess(data, request) {
        loginName = data.d.Title;
        loadMyCrewData(loginName);
        //loadMyEditData(loginName);
        //loadMyFileIngestData(loginName);
    }

    function onError(error) {
        console.log("Error on retrieving current user.");
    }
});

function filterMyRequest() {
    $('#myReqgrid-searchItem').val("");
    var seletedShow = "", startDate = "", endDate = "";
    if ($('#hierarchy-myrequest').text() != "Shows") {
        seletedShow = $('#hierarchy-myrequest').text().trim();
    }
    startDate = $('.myrequest-dateselect .date-value:eq(0)').text();
    endDate = $('.myrequest-dateselect .date-value:eq(1)').text();
    //if (finalmyCrewData.length > 0) {
    if ($('#accordion .ui-accordion-content-active').hasClass('accordion-content-my-crew')) {
        if (!!seletedShow && !!startDate.trim() && !!endDate.trim()) {
            filtermyCrewData = $.grep(finalmyCrewData, function (a) {
                return a.myCrewShowUnit.indexOf(seletedShow) != -1;
            });
            filtermyCrewData = $.grep(filtermyCrewData, function (a) {
                return (dateObj(startDate) <= dateObj(a.startDateFil) && dateObj(endDate) >= dateObj(a.startDateFil)) ||
                     (dateObj(startDate) <= dateObj(a.endDateFil) && dateObj(endDate) >= dateObj(a.endDateFil))
            });
            loadGrid($('#MyCrewGrid'), filtermyCrewData);
        }
        else if (!!seletedShow) {
            filtermyCrewData = $.grep(finalmyCrewData, function (a) {
                return a.myCrewShowUnit.indexOf(seletedShow) != -1;
            });
            loadGrid($('#MyCrewGrid'), filtermyCrewData);
        }
        else if (!!startDate.trim() && !!endDate.trim()) {
            filtermyCrewData = $.grep(finalmyCrewData, function (a) {
                return (dateObj(startDate) <= dateObj(a.startDateFil) && dateObj(endDate) >= dateObj(a.startDateFil)) ||
                     (dateObj(startDate) <= dateObj(a.endDateFil) && dateObj(endDate) >= dateObj(a.endDateFil))
            });
            loadGrid($('#MyCrewGrid'), filtermyCrewData);
        }
        else {
            loadGrid($('#MyCrewGrid'), finalmyCrewData);
        }
    }
    //if (finalmyEditData.length > 0) {
    else if ($('#accordion .ui-accordion-content-active').hasClass('accordion-content-my-edit')) {
        if (!!seletedShow && !!startDate.trim() && !!endDate.trim()) {
            filtermyEditData = $.grep(finalmyEditData, function (a) {
                return a.ShowUnit.indexOf(seletedShow) != -1;
            });
            filtermyEditData = $.grep(filtermyEditData, function (a) {
                return (dateObj(startDate) <= dateObj(a.editStartDateFil) && dateObj(endDate) >= dateObj(a.editStartDateFil)) ||
                     (dateObj(startDate) <= dateObj(a.airDateFil) && dateObj(endDate) >= dateObj(a.airDateFil))
            });
            loadGrid($('#MyEditGrid'), filtermyEditData);
        }
        else if (!!seletedShow) {
            filtermyEditData = $.grep(finalmyEditData, function (a) {
                return a.ShowUnit.indexOf(seletedShow) != -1;
            });
            loadGrid($('#MyEditGrid'), filtermyEditData);
        }
        else if (!!startDate.trim() && !!endDate.trim()) {
            filtermyEditData = $.grep(finalmyEditData, function (a) {
                return (dateObj(startDate) <= dateObj(a.editStartDateFil) && dateObj(endDate) >= dateObj(a.editStartDateFil)) ||
                     (dateObj(startDate) <= dateObj(a.airDateFil) && dateObj(endDate) >= dateObj(a.airDateFil))
            });
            loadGrid($('#MyEditGrid'), filtermyEditData);
        }
        else {
            loadGrid($('#MyEditGrid'), finalmyEditData);
        }
    }
    //if (finalmyFileIngestData.length > 0) {
    else if ($('#accordion .ui-accordion-content-active').hasClass('accordion-content-my-fileingest')) {
        if (!!seletedShow) {
            filtermyFileIngestData = $.grep(finalmyFileIngestData, function (a) {
                return a.ShowUnit.indexOf(seletedShow) != -1;
            });
            loadGrid($('#MyFileIngestGrid'), filtermyFileIngestData);
        }
        else {
            loadGrid($('#MyFileIngestGrid'), finalmyFileIngestData);
        }
    }
}

function loadAllCrewData() {
    var crCount = getListCount("CrewRequest");
    var CrewData = ReadList("", "CrewRequest", "?$select=ID,CrewType,OverrideApproval,Approver,ShootStatus,Producer,Requester,RequestStatus,CrewRequestID,StartDate1,EndDate1,DaysShoot,AssignmentSlug,StoryName,SuggestedResources,SelectedResources,Approval,CrewAddress,Created,Modified,Editor/Title&$expand=Editor&$filter=(((CrewStatus eq 'Step5' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and CrewType eq 'General Crew Request') or ((CrewStatus eq 'Step4' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and (CrewType eq 'Breaking News' or CrewType eq 'Correspondent Live Shot')) or ((CrewStatus eq 'Step1' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and CrewType eq 'Bureau Camera')) &$orderby=ID desc&$top=" + crCount);
    var talentCount = getListCount("CRT_Talent");
    var TalentData = ReadList("", "CRT_Talent", "?$select=ID,Title,CrewRequestID&$top=" + talentCount);
    var CRShowCount = getListCount("CRT_ShowUnit");
    var CrewShowUnit = ReadList("", "CRT_ShowUnit", "?$select=ID,Title,AssignedBudgetCode,RequestID&$top=" + CRShowCount);
    var CRResourceCount = getListCount("CRT_Resource");
    var CrewResource = ReadList("", "CRT_Resource", "?$select=ID,Title,Resource,ResourceRole,CrewRequestID&$top=" + CRResourceCount);
    var currCRTalentData = [], currCRShowUnit = [], currCRResource = [];
    var Talent = "", ShowUnitName = "", BudgetCode = "", ResName = "", ResRole = "";
    $.each(CrewData, function (CrewInd, CrewVal) {
        if (CrewVal.CrewType != "Bureau Camera") {
            currCRTalentData = $.grep(TalentData, function (a) {
                return a.CrewRequestID == CrewVal.ID.toString();
            });
            Talent = "";
            $.each(currCRTalentData, function (talInd, talVal) {
                if (talInd == 0) {
                    Talent = nullCheck(talVal.Title);
                }
                else {
                    Talent += ", " + nullCheck(talVal.Title);
                }
            });
        }
        currCRShowUnit = $.grep(CrewShowUnit, function (a) {
            return a.RequestID == CrewVal.ID.toString();
        });
        ShowUnitName = "", BudgetCode = "";
        $.each(currCRShowUnit, function (showInd, showVal) {
            if (showInd == 0) {
                ShowUnitName = nullCheck(showVal.Title);
                BudgetCode = nullCheck(showVal.AssignedBudgetCode);
            }
            else {
                ShowUnitName += "| " + nullCheck(showVal.Title);
                BudgetCode += "| " + nullCheck(showVal.AssignedBudgetCode);
            }
        });
        currCRResource = $.grep(CrewResource, function (a) {
            return a.CrewRequestID == CrewVal.ID.toString();
        });
        ResName = "", ResRole = "";
        $.each(currCRResource, function (showInd, showVal) {
            if (showInd == 0) {
                ResName = peoplePickerClear(showVal.Resource);
                ResRole = nullCheck(showVal.ResourceRole);
            }
            else {
                ResName += "| " + peoplePickerClear(showVal.Resource);
                ResRole += "| " + nullCheck(showVal.ResourceRole);
            }
        });
        var status = 'New';
        if (!!CrewVal.RequestStatus) {
            status = CrewVal.RequestStatus
        }
        if (status.trim() == "New") {
            statusIndex = 1;
        }
        else if (status.trim() == "Revised") {
            statusIndex = 2;
        }
        else {
            statusIndex = 3;
        }
        var Approval = 'NA';
        if (!!CrewVal.OverrideApproval) {
            Approval = CrewVal.OverrideApproval;
        }

        finalAllCrewData.push({
            ID: CrewVal.ID,
            Approver: peoplePickerClear(CrewVal.Approver),
            Producer: peoplePickerClear(CrewVal.Producer),
            Requester: peoplePickerClear(CrewVal.Requester),
            RequestStatus: nullCheck(CrewVal.RequestStatus),
            CrewRequestID: nullCheck(CrewVal.CrewRequestID),
            StartDate1: nullCheck(dateString(CrewVal.StartDate1)),
            EndDate1: nullCheck(dateString(CrewVal.EndDate1)),
            DaysShoot: nullCheck(CrewVal.DaysShoot),
            ShootStatus: nullCheck(CrewVal.ShootStatus),
            statusIndex: statusIndex,
            AssignmentSlug: nullCheck(CrewVal.AssignmentSlug),
            StoryName: nullCheck(CrewVal.StoryName),
            Talent: Talent,
            myCrewShowUnit: ShowUnitName,
            myCrewBudgetCode: BudgetCode,
            myCrewResName: ResName,
            myCrewResRole: ResRole,
            SuggestedResources: nullCheck(CrewVal.SuggestedResources),
            SelectedResources: nullCheck(CrewVal.SelectedResources),
            Approval: Approval,
            CrewAddress: nullCheck(CrewVal.CrewAddress),
            Created: formatExcatDate(CrewVal.Created),
            Modified: formatExcatDate(CrewVal.Modified),
            ModifiedBy: peoplePickerClear(CrewVal.Editor.Title)
        });
    });
    $('#CrewGrid').jqGrid({
        datatype: "local",
        data: finalAllCrewData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'CREW REQ STATUS', 'Date', 'Slug/Talent/Story', 'Show', 'Resources', 'Suggested/Actual', 'Location', 'Users', 'Log'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 70, sorttype: "int", hidden: true },
            { name: 'statusIndex', index: 'statusIndex', width: 80, sorttype: "int", hidden: true },
            { name: 'CERWREQSTATUS', index: 'CREWREQSTATUS', formatter: myCrewGridReqStatus, width: 110, title: false, resizable: false },
            { name: 'Date', index: 'Date', formatter: myCrewGridDate, width: 110, title: false, resizable: false },
            { name: 'SlugTalentStory', index: 'Date', formatter: myCrewGridSlugTalentStory, width: 100, title: false, resizable: false },
            { name: 'Show', index: 'Show', formatter: myCrewGridShow, width: 110, title: false, resizable: false },
            { name: 'Resources', index: 'Resources', formatter: myCrewGridResources, width: 100, title: false, resizable: false },
            { name: 'SuggestedActual', index: 'SuggestedActual', formatter: myCrewGridSuggestedActual, width: 100, title: false, resizable: false },
            { name: 'CrewAddress', index: 'CrewAddress', width: 90 },
            { name: 'Users', index: 'Users', formatter: myCrewGridUsers, width: 100, title: false, resizable: false },
            { name: 'Log', index: 'Log', formatter: myCrewGridLog, width: 100, title: false, resizable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 20,
        rowNum: 10,
        pager: '#Crewpager',
        sortname: 'statusIndex',
        sortorder: 'asc',
    });
}

function loadMyCrewData(loginName) {
    var myCrewData = ReadList("", "CrewRequest", "?$select=ID,CrewType,OverrideApproval,Approver,ShootStatus,Producer,Requester,RequestStatus,CrewRequestID,StartDate1,EndDate1,DaysShoot,AssignmentSlug,StoryName,SuggestedResources,SelectedResources,Approval,CrewAddress,Created,Modified,Editor/Title&$expand=Editor&$filter=(Approver eq '" + loginName + "' or Producer eq '" + loginName + "' or Requester eq '" + loginName + "') and (((CrewStatus eq 'Step5' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and CrewType eq 'General Crew Request') or ((CrewStatus eq 'Step4' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and (CrewType eq 'Breaking News' or CrewType eq 'Correspondent Live Shot')) or ((CrewStatus eq 'Step1' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and CrewType eq 'Bureau Camera')) &$orderby=ID desc&$top=50");
    var talentId = "", showID = "", resourceId = "";
    $.each(myCrewData, function (myCrewInd, myCrewVal) {
        if (myCrewInd == 0) {
            talentId = "CrewRequestID eq '" + myCrewVal.ID + "'";
            showID = "RequestID eq '" + myCrewVal.ID + "'";
            resourceId = "CrewRequestID eq '" + myCrewVal.ID + "'";
        }
        else {
            talentId += " or CrewRequestID eq '" + myCrewVal.ID + "'";
            showID += " or RequestID eq '" + myCrewVal.ID + "'";
            resourceId += " or CrewRequestID eq '" + myCrewVal.ID + "'";
        }
    });

    var myTalentData = [];
    var currMyTalentData = [];
    var Talent = "";
    var myCrewShowUnit = [];
    var currMyCrewShowUnit = [];
    var myCrewShowUnitName = '';
    var myCrewBudgetCode = '';
    var myCrewResource = [];
    var currMyCrewResource = [];
    var myCrewResName = '';
    var myCrewResRole = '';
    myTalentData = ReadList("", "CRT_Talent", "?$select=ID,Title,CrewRequestID&$filter=" + talentId);
    myCrewShowUnit = ReadList("", "CRT_ShowUnit", "?$select=ID,Title,AssignedBudgetCode,RequestID&$filter=" + showID);
    myCrewResource = ReadList("", "CRT_Resource", "?$select=ID,Title,Resource,ResourceRole,CrewRequestID&$filter=" + resourceId);
    $.each(myCrewData, function (myCrewInd, myCrewVal) {
        Talent = "";
        if (myCrewVal.CrewType != "Bureau Camera") {
            currMyTalentData = $.grep(myTalentData, function (a) {
                return a.CrewRequestID == myCrewVal.ID.toString();
            });
            //ReadList("", "CRT_Talent", "?$select=ID,Title,CrewRequestID&$filter=CrewRequestID eq '" + myCrewVal.ID + "'");
            $.each(currMyTalentData, function (talInd, talVal) {
                if (talInd == 0) {
                    Talent = nullCheck(talVal.Title);
                }
                else {
                    Talent += ", " + nullCheck(talVal.Title);
                }
            });
        }
        //myCrewShowUnit = ReadList("", "CRT_ShowUnit", "?$select=ID,Title,AssignedBudgetCode,RequestID&$filter=RequestID eq '" + myCrewVal.ID + "'");
        currMyCrewShowUnit = $.grep(myCrewShowUnit, function (a) {
            return a.RequestID == myCrewVal.ID.toString();
        });
        myCrewShowUnitName = "", myCrewBudgetCode = "";
        $.each(currMyCrewShowUnit, function (showInd, showVal) {
            if (showInd == 0) {
                myCrewShowUnitName = nullCheck(showVal.Title);
                myCrewBudgetCode = nullCheck(showVal.AssignedBudgetCode);
            }
            else {
                myCrewShowUnitName += "| " + nullCheck(showVal.Title);
                myCrewBudgetCode += "| " + nullCheck(showVal.AssignedBudgetCode);
            }
        });
        //myCrewResource = ReadList("", "CRT_Resource", "?$select=ID,Title,Resource,ResourceRole,CrewRequestID&$filter=CrewRequestID eq '" + myCrewVal.ID + "'");
        currMyCrewResource = $.grep(myCrewResource, function (a) {
            return a.CrewRequestID == myCrewVal.ID.toString();
        });
        myCrewResName = "", myCrewResRole = "";
        $.each(currMyCrewResource, function (showInd, showVal) {
            if (showInd == 0) {
                myCrewResName = peoplePickerClear(showVal.Resource);
                myCrewResRole = nullCheck(showVal.ResourceRole);
            }
            else {
                myCrewResName += "| " + peoplePickerClear(showVal.Resource);
                myCrewResRole += "| " + nullCheck(showVal.ResourceRole);
            }
        });
        var status = 'New';
        if (!!myCrewVal.RequestStatus) {
            status = myCrewVal.RequestStatus
        }
        if (status.trim() == "New") {
            statusIndex = 1;
        }
        else if (status.trim() == "Revised") {
            statusIndex = 2;
        }
        else {
            statusIndex = 3;
        }
        var Approval = 'NA';
        if (!!myCrewVal.OverrideApproval) {
            Approval = myCrewVal.OverrideApproval;
        }

        finalmyCrewData.push({
            ID: myCrewVal.ID,
            Approver: peoplePickerClear(myCrewVal.Approver),
            Producer: peoplePickerClear(myCrewVal.Producer),
            Requester: peoplePickerClear(myCrewVal.Requester),
            RequestStatus: status,
            CrewRequestID: nullCheck(myCrewVal.CrewRequestID),
            StartDate1: nullCheck(dateString(myCrewVal.StartDate1)),
            startDateFil: myCrewVal.StartDate1,
            EndDate1: nullCheck(dateString(myCrewVal.EndDate1)),
            endDateFil: myCrewVal.EndDate1,
            DaysShoot: nullCheck(myCrewVal.DaysShoot),
            ShootStatus: nullCheck(myCrewVal.ShootStatus),
            statusIndex: statusIndex,
            AssignmentSlug: nullCheck(myCrewVal.AssignmentSlug),
            StoryName: nullCheck(myCrewVal.StoryName),
            Talent: Talent,
            myCrewShowUnit: myCrewShowUnitName,
            myCrewBudgetCode: myCrewBudgetCode,
            myCrewResName: myCrewResName,
            myCrewResRole: myCrewResRole,
            SuggestedResources: nullCheck(myCrewVal.SuggestedResources),
            SelectedResources: nullCheck(myCrewVal.SelectedResources),
            Approval: Approval,
            CrewAddress: nullCheck(myCrewVal.CrewAddress),
            Created: formatExcatDate(myCrewVal.Created),
            Modified: formatExcatDate(myCrewVal.Modified),
            ModifiedBy: peoplePickerClear(myCrewVal.Editor.Title)
        });
    });
    $('#MyCrewGrid').jqGrid({
        datatype: "local",
        data: finalmyCrewData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'CREW REQ STATUS', 'Date', 'Slug/Talent/Story', 'Show', 'Resources', 'Suggested/Actual', 'Location', 'Users', 'Log'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 70, sorttype: "int", hidden: true },
            { name: 'statusIndex', index: 'statusIndex', width: 80, sorttype: "int", hidden: true },
            { name: 'CERWREQSTATUS', index: 'CREWREQSTATUS', formatter: myCrewGridReqStatus, width: 120, title: false, resizable: false },
            { name: 'Date', index: 'Date', formatter: myCrewGridDate, width: 110, title: false, resizable: false },
            { name: 'SlugTalentStory', index: 'Date', formatter: myCrewGridSlugTalentStory, width: 100, title: false, resizable: false },
            { name: 'Show', index: 'Show', formatter: myCrewGridShow, width: 110, title: false, resizable: false },
            { name: 'Resources', index: 'Resources', formatter: myCrewGridResources, width: 100, title: false, resizable: false },
            { name: 'SuggestedActual', index: 'SuggestedActual', formatter: myCrewGridSuggestedActual, width: 100, title: false, resizable: false },
            { name: 'CrewAddress', index: 'CrewAddress', width: 90 },
            { name: 'Users', index: 'Users', formatter: myCrewGridUsers, width: 100, title: false, resizable: false },
            { name: 'Log', index: 'Log', formatter: myCrewGridLog, width: 100, title: false, resizable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 20,
        rowNum: 5,
        pager: '#MyCrewpager',
        sortname: 'ID',
        sortorder: 'desc',
    });
}

function loadAllEditData() {
    var erCount = getListCount("EditRequest");
    var editData = ReadList("", "EditRequest", "?$select=ID,Id,Title,EditRequestID,EditType,ERRequestStatus,EditStatus,EditStartDate,AirDate,Slug,ShowUnit,BudgetCode,CraftEditDays,CraftEditHours,CraftEditMinutes,ProducerName,SeniorProducer,RequestorName,Created,Modified,Editor/Title&$expand=Editor&$filter=EditStatus eq 'FormSubmit' and (EditType eq 'Edit Request' or EditType eq 'Long Form Edit Request') &$orderby=ID desc&$top=" + erCount);
    var editShow = [];
    var editor = [];
    var erShowCount = getListCount("ER_ShowUnit");
    editShow = ReadList("", "ER_ShowUnit", "?$select=ID,Title,ShowUnitID,AssignedBudgetCode,RequestID&$top=" + erShowCount);
    var erEditorCount = getListCount("Editor");
    editor = ReadList("", "Editor", "?$select=ID,Title,EditorAssigned,EditorRequestID,Room&$top=" + erEditorCount);
    var currEditShow = [];
    var currEditor = [];
    var editShowText = "", editorText = "", editorRoomText = "";
    $.each(editData, function (editInd, editVal) {
        if (editVal.EditType == "Edit Request") {
            currEditShow = $.grep(editShow, function (a) {
                return a.RequestID == editVal.ID.toString();
            });
            editShowText = "";
            $.each(currEditShow, function (showInd, showVal) {
                if (showInd == 0) {
                    editShowText = nullCheck(showVal.ShowUnitID);
                }
                else {
                    editShowText += ", " + nullCheck(showVal.ShowUnitID);
                }
            });
        }
        else {
            editShowText = editVal.ShowUnit;
        }
        currEditor = $.grep(editor, function (a) {
            return a.EditorRequestID == editVal.ID.toString();
        });
        editorText = "", editorRoomText = "";
        $.each(currEditor, function (ediInd, ediVal) {
            if (ediInd == 0) {
                editorText = peoplePickerClear(ediVal.EditorAssigned);
                editorRoomText = nullCheck(ediVal.Room);
            }
            else {
                editorText += "| " + peoplePickerClear(ediVal.EditorAssigned);
                editorRoomText += "| " + nullCheck(ediVal.Room);
            }
        });
        var status = 'New';
        if (!!editVal.ERRequestStatus) {
            status = editVal.ERRequestStatus
        }
        if (status.trim().toUpperCase() == "NEW") {
            statusIndex = 1;
        }
        else if (status.trim().toUpperCase() == "REVISED") {
            statusIndex = 2;
        }
        else {
            statusIndex = 3;
        }

        finalAllEditData.push({
            ID: editVal.ID,
            RequestorName: peoplePickerClear(editVal.RequestorName),
            ProducerName: peoplePickerClear(editVal.ProducerName),
            SeniorProducer: peoplePickerClear(editVal.SeniorProducer),
            status: status,
            EditRequestID: nullCheck(editVal.EditRequestID),
            EditStartDate: nullCheck(dateString(editVal.EditStartDate)),
            AirDate: nullCheck(dateString(editVal.AirDate)),
            Slug: nullCheck(editVal.Slug),
            ShowUnit: editShowText,
            statusIndex: statusIndex,
            CraftEditDays: nullCheck(editVal.CraftEditDays),
            CraftEditHours: nullCheck(editVal.CraftEditHours),
            CraftEditMinutes: nullCheck(editVal.CraftEditMinutes),
            Editor: editorText,
            Room: editorRoomText,
            Created: formatExcatDate(editVal.Created),
            Modified: formatExcatDate(editVal.Modified),
            ModifiedBy: peoplePickerClear(editVal.Editor.Title)
        });
    });
    $('#EditGrid').jqGrid({
        datatype: "local",
        data: finalAllEditData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'EDIT REQ STATUS', 'Edit/Air Date', 'Slug', 'Show', 'Edit Duration', 'Editor Name', 'Edit Room(xPhone)', 'Users', 'Log'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sorttype: "int", hidden: true },
            { name: 'statusIndex', index: 'statusIndex', width: 60, sorttype: "int", hidden: true },
            { name: 'EDITREQSTATUS', index: 'EDITREQSTATUS', formatter: myEditGridReqStatus, width: 100, title: false, resizable: false },
            { name: 'Date', index: 'Date', formatter: myEditGridDate, width: 100, title: false, resizable: false },
            { name: 'Slug', index: 'Slug', width: 60 },
            { name: 'ShowUnit', index: 'ShowUnit', width: 60 },
            { name: 'EditDuration', index: 'EditDuration', formatter: myEditDuration, width: 100, title: false, resizable: false },
            { name: 'EditorName', index: 'EditorName', formatter: myEditorName, width: 100, title: false, resizable: false },
            { name: 'EditRoom', index: 'EditRoom', formatter: myEditRoom, width: 100, title: false, resizable: false },
            { name: 'Users', index: 'Users', formatter: myEditGridUsers, width: 100, title: false, resizable: false },
            { name: 'Log', index: 'Log', formatter: myCrewGridLog, width: 100, title: false, resizable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 20,
        rowNum: 10,
        pager: '#Editpager',
        sortname: 'ID',
        sortorder: 'desc',
    });
}

function loadMyEditData(loginName) {
    var myEditData = ReadList("", "EditRequest", "?$select=ID,Id,Title,EditRequestID,EditType,ERRequestStatus,EditStatus,EditStartDate,AirDate,Slug,ShowUnit,BudgetCode,CraftEditDays,CraftEditHours,CraftEditMinutes,ProducerName,SeniorProducer,RequestorName,Created,Modified,Editor/Title&$expand=Editor&$filter=(RequestorName eq '" + loginName + "' or SeniorProducer eq '" + loginName + "' or ProducerName eq '" + loginName + "') and EditStatus eq 'FormSubmit' and (EditType eq 'Edit Request' or EditType eq 'Long Form Edit Request') &$orderby=ID desc&$top=50");
    var editorId = "", showID = "";
    $.each(myEditData, function (myEditInd, myEditVal) {
        if (myEditInd == 0) {
            editorId = "EditorRequestID eq '" + myEditVal.ID + "'";
            if (myEditVal.EditType == "Edit Request") {
                showID = "RequestID eq '" + myEditVal.ID + "'";
            }
        }
        else {
            if (myEditInd < 49) {
                editorId += " or EditorRequestID eq '" + myEditVal.ID + "'";

            }
            if (myEditVal.EditType == "Edit Request") {
                if (!!showID) {
                    showID += " or RequestID eq '" + myEditVal.ID + "'";
                }
                else {
                    showID += "RequestID eq '" + myEditVal.ID + "'";
                }
            }
        }
    });
    var myEditShow = [];
    var myEditor = [];
    myEditShow = ReadList("", "ER_ShowUnit", "?$select=ID,Title,ShowUnitID,AssignedBudgetCode,RequestID&$filter=" + showID);
    myEditor = ReadList("", "Editor", "?$select=ID,Title,EditorAssigned,EditorRequestID,Room&$filter=" + editorId);
    var currMyEditShow = [];
    var currMyEditor = [];
    var myEditShowText = "", myEditorText = "", myEditorRoomText = "";
    $.each(myEditData, function (myEditInd, myEditVal) {
        if (myEditVal.EditType == "Edit Request") {
            currMyEditShow = $.grep(myEditShow, function (a) {
                return a.RequestID == myEditVal.ID.toString();
            });
            myEditShowText = "";
            $.each(currMyEditShow, function (showInd, showVal) {
                if (showInd == 0) {
                    myEditShowText = nullCheck(showVal.ShowUnitID);
                }
                else {
                    myEditShowText += ", " + nullCheck(showVal.ShowUnitID);
                }
            });
        }
        else {
            myEditShowText = myEditVal.ShowUnit;
        }
        currMyEditor = $.grep(myEditor, function (a) {
            return a.EditorRequestID == myEditVal.ID.toString();
        });
        myEditorText = "", myEditorRoomText = "";
        $.each(currMyEditor, function (ediInd, ediVal) {
            if (ediInd == 0) {
                myEditorText = peoplePickerClear(ediVal.EditorAssigned);
                myEditorRoomText = nullCheck(ediVal.Room);
            }
            else {
                myEditorText += "| " + peoplePickerClear(ediVal.EditorAssigned);
                myEditorRoomText += "| " + nullCheck(ediVal.Room);
            }
        });
        var status = 'New';
        if (!!myEditVal.ERRequestStatus) {
            status = myEditVal.ERRequestStatus
        }
        if (status.trim().toUpperCase() == "NEW") {
            statusIndex = 1;
        }
        else if (status.trim().toUpperCase() == "REVISED") {
            statusIndex = 2;
        }
        else {
            statusIndex = 3;
        }

        finalmyEditData.push({
            ID: myEditVal.ID,
            RequestorName: peoplePickerClear(myEditVal.RequestorName),
            ProducerName: peoplePickerClear(myEditVal.ProducerName),
            SeniorProducer: peoplePickerClear(myEditVal.SeniorProducer),
            status: status,
            EditRequestID: nullCheck(myEditVal.EditRequestID),
            EditStartDate: nullCheck(dateString(myEditVal.EditStartDate)),
            editStartDateFil:myEditVal.EditStartDate,
            AirDate: nullCheck(dateString(myEditVal.AirDate)),
            airDateFil:myEditVal.AirDate,
            Slug: nullCheck(myEditVal.Slug),
            ShowUnit: myEditShowText,
            statusIndex: statusIndex,
            CraftEditDays: nullCheck(myEditVal.CraftEditDays),
            CraftEditHours: nullCheck(myEditVal.CraftEditHours),
            CraftEditMinutes: nullCheck(myEditVal.CraftEditMinutes),
            Editor: myEditorText,
            Room: myEditorRoomText,
            Created: formatExcatDate(myEditVal.Created),
            Modified: formatExcatDate(myEditVal.Modified),
            ModifiedBy: peoplePickerClear(myEditVal.Editor.Title)
        });
    });
    $('#MyEditGrid').jqGrid({
        datatype: "local",
        data: finalmyEditData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'EDIT REQ STATUS', 'Edit/Air Date', 'Slug', 'Show', 'Edit Duration', 'Editor Name', 'Edit Room(xPhone)', 'Users', 'Log'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sorttype: "int", hidden: true },
            { name: 'statusIndex', index: 'statusIndex', width: 60, sorttype: "int", hidden: true },
            { name: 'EDITREQSTATUS', index: 'EDITREQSTATUS', formatter: myEditGridReqStatus, width: 100, title: false, resizable: false },
            { name: 'Date', index: 'Date', formatter: myEditGridDate, width: 100, title: false, resizable: false },
            { name: 'Slug', index: 'Slug', width: 60 },
            { name: 'ShowUnit', index: 'ShowUnit', width: 60 },
            { name: 'EditDuration', index: 'EditDuration', formatter: myEditDuration, width: 100, title: false, resizable: false },
            { name: 'EditorName', index: 'EditorName', formatter: myEditorName, width: 100, title: false, resizable: false },
            { name: 'EditRoom', index: 'EditRoom', formatter: myEditRoom, width: 100, title: false, resizable: false },
            { name: 'Users', index: 'Users', formatter: myEditGridUsers, width: 100, title: false, resizable: false },
            { name: 'Log', index: 'Log', formatter: myCrewGridLog, width: 100, title: false, resizable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 20,
        rowNum: 5,
        pager: '#MyEditpager',
        sortname: 'ID',
        sortorder: 'desc',
    });
}

function loadAllFileIngestData() {
    var flCount = getListCount("FileIngest");
    var fileIngestData = ReadList("", "FileIngest", "?$select=ID,FIStatus,FileIngestID,ShowUnit,Workgroup,Slug,CameraType,RequestorName,ProducerName,SeniorProducer,Created,IngestStatus&$filter=IngestStatus eq 'FormComplete' &$top=" + flCount);
    var addDevCount = getListCount("AdditionalDevices");
    var fiDeviceData = ReadList("", "AdditionalDevices", "?$select=ID,Title,DeviceType,Quantity,fileIngestID&$top=" + addDevCount);
    var currFIDevice = [];
    var fiDeviceName = "", fiQuantityName = "";
    $.each(fileIngestData, function (fiInd, fiVal) {
        currFIDevice = $.grep(fiDeviceData, function (a) {
            return a.fileIngestID == fiVal.ID.toString();
        });
        fiDeviceName = "", fiQuantityName = "";
        $.each(currFIDevice, function (devInd, devVal) {
            if (devInd == 0) {
                fiDeviceName = nullCheck(devVal.Title);
                fiQuantityName = nullCheck(devVal.Quantity);
            }
            else {
                fiDeviceName += "| " + nullCheck(devVal.Title);
                fiQuantityName += "| " + nullCheck(devVal.Quantity);
            }
        });
        var status = 'New';
        if (!!fiVal.FIStatus) {
            status = fiVal.FIStatus
        }
        if (status.trim().toUpperCase() == "NEW") {
            statusIndex = 1;
        }
        else if (status.trim().toUpperCase() == "REVISED") {
            statusIndex = 2;
        }
        else {
            statusIndex = 3;
        }
        finalAllFileIngestData.push({
            ID: fiVal.ID,
            FileIngestID: nullCheck(fiVal.FileIngestID),
            ShowUnit: nullCheck(fiVal.ShowUnit),
            Workgroup: nullCheck(fiVal.Workgroup),
            Slug: nullCheck(fiVal.Slug),
            status: status,
            statusIndex: statusIndex,
            Device: fiDeviceName,
            Quantity: fiQuantityName,
            CameraType: nullCheck(fiVal.CameraType),
            RequestorName: peoplePickerClear(fiVal.RequestorName),
            ProducerName: peoplePickerClear(fiVal.ProducerName),
            SeniorProducer: peoplePickerClear(fiVal.SeniorProducer),
            Created: formatExcatDate(fiVal.Created),
        });
    });
    $('#FileGrid').jqGrid({
        datatype: "local",
        data: finalAllFileIngestData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'FILE INGEST STATUS', 'Show', 'Workgroup', 'Slug', 'Device(s)', 'Camera Type', 'Received ?', 'Users', 'Log'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sorttype: "int", hidden: true },
            { name: 'statusIndex', index: 'statusIndex', width: 60, sorttype: "int", hidden: true },
            { name: 'FILEINGESTSTATUS', index: 'FILEINGESTSTATUS', formatter: myFILEINGESTStatus, width: 100, title: false, resizable: false },
            { name: 'ShowUnit', index: 'ShowUnit', width: 60 },
            { name: 'Workgroup', index: 'Workgroup', width: 60 },
            { name: 'Slug', index: 'EditDuration', width: 60 },
            { name: 'Devices', index: 'Devices', formatter: myFIDevices, width: 100, title: false, resizable: false },
            { name: 'CameraType', index: 'CameraType', formatter: myFICameraType, width: 100, title: false, resizable: false },
            { name: 'Received', index: 'Received', width: 60 },
            { name: 'Users', index: 'Users', formatter: myFIGridUsers, width: 100, title: false, resizable: false },
            { name: 'Log', index: 'Log', formatter: myFIGridLog, width: 100, title: false, resizable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 20,
        rowNum: 10,
        pager: '#Filepager',
        sortname: 'ID',
        sortorder: 'desc',
    });
}

function loadMyFileIngestData(loginName) {
    var myFileIngestData = ReadList("", "FileIngest", "?$select=ID,FIStatus,FileIngestID,ShowUnit,Workgroup,Slug,CameraType,RequestorName,ProducerName,SeniorProducer,Created,IngestStatus&$filter=(RequestorName eq '" + loginName + "' or ProducerName eq '" + loginName + "' or SeniorProducer eq '" + loginName + "') and (IngestStatus eq 'FormComplete') &$top=50");
    var deviceId = "";
    $.each(myFileIngestData, function (myFIInd, myFIVal) {
        if (myFIInd == 0) {
            deviceId = "fileIngestID eq '" + myFIVal.ID + "'";
        }
        else {
            deviceId += " or fileIngestID eq '" + myFIVal.ID + "'";
        }
    });
    var myFIDeviceData = ReadList("", "AdditionalDevices", "?$select=ID,Title,DeviceType,Quantity,fileIngestID&$filter=" + deviceId);
    var currMyFIDevice = [];
    var myFIDeviceName = "", myFIQuantityName = "";
    $.each(myFileIngestData, function (myFIInd, myFIVal) {
        currMyFIDevice = $.grep(myFIDeviceData, function (a) {
            return a.fileIngestID == myFIVal.ID.toString();
        });
        myFIDeviceName = "", myFIQuantityName = "";
        $.each(currMyFIDevice, function (devInd, devVal) {
            if (devInd == 0) {
                myFIDeviceName = nullCheck(devVal.Title);
                myFIQuantityName = nullCheck(devVal.Quantity);
            }
            else {
                myFIDeviceName += "| " + nullCheck(devVal.Title);
                myFIQuantityName += "| " + nullCheck(devVal.Quantity);
            }
        });
        var status = 'New';
        if (!!myFIVal.FIStatus) {
            status = myFIVal.FIStatus
        }
        if (status.trim().toUpperCase() == "NEW") {
            statusIndex = 1;
        }
        else if (status.trim().toUpperCase() == "REVISED") {
            statusIndex = 2;
        }
        else {
            statusIndex = 3;
        }
        finalmyFileIngestData.push({
            ID: myFIVal.ID,
            FileIngestID: nullCheck(myFIVal.FileIngestID),
            ShowUnit: nullCheck(myFIVal.ShowUnit),
            Workgroup: nullCheck(myFIVal.Workgroup),
            Slug: nullCheck(myFIVal.Slug),
            status: status,
            statusIndex: statusIndex,
            Device: myFIDeviceName,
            Quantity: myFIQuantityName,
            CameraType: nullCheck(myFIVal.CameraType),
            RequestorName: peoplePickerClear(myFIVal.RequestorName),
            ProducerName: peoplePickerClear(myFIVal.ProducerName),
            SeniorProducer: peoplePickerClear(myFIVal.SeniorProducer),
            Created: formatExcatDate(myFIVal.Created),
        });
    });
    $('#MyFileIngestGrid').jqGrid({
        datatype: "local",
        data: finalmyFileIngestData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'FILE INGEST STATUS', 'Show', 'Workgroup', 'Slug', 'Device(s)', 'Camera Type', 'Received ?', 'Users', 'Log'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sorttype: "int", hidden: true },
            { name: 'statusIndex', index: 'statusIndex', width: 60, sorttype: "int", hidden: true },
            { name: 'FILEINGESTSTATUS', index: 'FILEINGESTSTATUS', formatter: myFILEINGESTStatus, width: 100, title: false, resizable: false },
            { name: 'ShowUnit', index: 'ShowUnit', width: 60 },
            { name: 'Workgroup', index: 'Workgroup', width: 60 },
            { name: 'Slug', index: 'EditDuration', width: 60 },
            { name: 'Devices', index: 'Devices', formatter: myFIDevices, width: 100, title: false, resizable: false },
            { name: 'CameraType', index: 'CameraType', formatter: myFICameraType, width: 100, title: false, resizable: false },
            { name: 'Received', index: 'Received', width: 60 },
            { name: 'Users', index: 'Users', formatter: myFIGridUsers, width: 100, title: false, resizable: false },
            { name: 'Log', index: 'Log', formatter: myFIGridLog, width: 100, title: false, resizable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 20,
        rowNum: 5,
        pager: '#MyFileIngestpager',
        sortname: 'ID',
        sortorder: 'desc',
    });
}

function loadAllReportData() {
    var erCount = getListCount("EditRequest");
    var editData = ReadList("", "EditRequest", "?$select=ID,Title,EditType,EditStatus,EditRequestID,RequestorName,RequestorContact,RequestorEmail,ShowUnit,AirDate,BudgetCode,SFPEOpenPackage,SFPEVOSOT,SFPEFixes,SFPEWebEdit,SFEEOpenPackage,SFEEVOSOT,SFEEFixes,SFEEWebEdit,SFPEOpenPackageHowMany,SFPEVOSOTHowMany,SFPEFixesHowMany,SFPEWebEditHowMany,SFEEOpenPackageHowMany,SFEEVOSOTHowMany,SFEEFixesHowMany,SFEEWebEditHowMany,AMColdOpen,AMRevisionToBRollsVOSOT,AMShowFixes,AMUpdates,AMTeasesOpenBody,AMCrashPieces,AMPreTapes,AMRevisionsToSpotsTracks,AMNewBRollVOSOT,AMQuickTurnaroundCrash,AMMusic,AMGraphicStills,AMColorCorrect,AMAudioCorrect,AMEffects,AMOther,AMAllOfTheAbove,AROtherText&$filter=EditStatus eq 'FormSubmit' and (EditType eq 'MSNBC Short Form' or EditType eq 'TDY/WTDY AM Form') &$orderby=ID desc&$top=" + erCount);
    $.each(editData, function (editInd, editVal) {
        if (editVal.EditType == "MSNBC Short Form") {
            finalMSNBCData.push({
                ID: editVal.ID,
                Title: editVal.Title,
                EditRequestID: nullCheck(editVal.EditRequestID),
                RequestorName: peoplePickerClear(editVal.RequestorName),
                RequestorContact: nullCheck(editVal.RequestorContact),
                RequestorEmail: nullCheck(editVal.RequestorEmail),
                Show: nullCheck(editVal.ShowUnit),
                airDate: editVal.AirDate,
                SummaryAirDate: nullCheck(dateString(editVal.AirDate)),
                BudgetCode: nullCheck(editVal.BudgetCode),
                SFPEOpenPackage: editVal.SFPEOpenPackage,
                SFPEVOSOT: editVal.SFPEVOSOT,
                SFPEFixes: editVal.SFPEFixes,
                SFPEWebEdit: editVal.SFPEWebEdit,
                SFEEOpenPackage: editVal.SFEEOpenPackage,
                SFEEVOSOT: editVal.SFEEVOSOT,
                SFEEFixes: editVal.SFEEFixes,
                SFEEWebEdit: editVal.SFEEWebEdit,
                SFPEOpenPackageHowMany: nullCheck(editVal.SFPEOpenPackageHowMany),
                SFPEVOSOTHowMany: nullCheck(editVal.SFPEVOSOTHowMany),
                SFPEFixesHowMany: nullCheck(editVal.SFPEFixesHowMany),
                SFPEWebEditHowMany: nullCheck(editVal.SFPEWebEditHowMany),
                SFEEOpenPackageHowMany: nullCheck(editVal.SFEEOpenPackageHowMany),
                SFEEVOSOTHowMany: nullCheck(editVal.SFEEVOSOTHowMany),
                SFEEFixesHowMany: nullCheck(editVal.SFEEFixesHowMany),
                SFEEWebEditHowMany: nullCheck(editVal.SFEEWebEditHowMany)
            });
        }
        else if (editVal.EditType == "TDY/WTDY AM Form") {
            finalTDYData.push({
                ID: editVal.ID,
                Title: editVal.Title,
                EditRequestID: nullCheck(editVal.EditRequestID),
                RequestorName: peoplePickerClear(editVal.RequestorName),
                RequestorContact: nullCheck(editVal.RequestorContact),
                RequestorEmail: nullCheck(editVal.RequestorEmail),
                Show: nullCheck(editVal.ShowUnit),
                airDate: editVal.AirDate,
                SummaryAirDate: nullCheck(dateString(editVal.AirDate)),
                AMColdOpen: editVal.AMColdOpen,
                AMRevisionToBRollsVOSOT: editVal.AMRevisionToBRollsVOSOT,
                AMShowFixes: editVal.AMShowFixes,
                AMUpdates: editVal.AMUpdates,
                AMTeasesOpenBody: editVal.AMTeasesOpenBody,
                AMCrashPieces: editVal.AMCrashPieces,
                AMPreTapes: editVal.AMPreTapes,
                AMRevisionsToSpotsTracks: editVal.AMRevisionsToSpotsTracks,
                AMNewBRollVOSOT: editVal.AMNewBRollVOSOT,
                AMQuickTurnaroundCrash: editVal.AMQuickTurnaroundCrash,
                AMMusic: editVal.AMMusic,
                AMGraphicStills: editVal.AMGraphicStills,
                AMColorCorrect: editVal.AMColorCorrect,
                AMAudioCorrect: editVal.AMAudioCorrect,
                AMEffects: editVal.AMEffects,
                AMOther: editVal.AMOther,
                AMAllOfTheAbove: editVal.AMAllOfTheAbove,
                AROtherText: editVal.AROtherText
            });
        }
    });
    $('#MSNBCGrid').jqGrid({
        datatype: "local",
        data: finalMSNBCData,
        url: 'clientArray',
        colNames: ['ID', 'MSNBC FORM ID', 'Requester', 'Contact #', 'Email', 'Show Unit', 'Air Date', 'airDate', 'Budget Code', 'Producer Edit', 'Editor Edit'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sorttype: "int", hidden: true, sortable: true },
            { name: 'FormID', index: 'FormID', formatter: gridMSNBCFormID, width: 100, title: false, resizable: false, sortable: false },
            { name: 'RequestorName', index: 'RequestorName', width: 90, sortable: false },
            { name: 'RequestorContact', index: 'RequestorContact', width: 80, sortable: false },
            { name: 'RequestorEmail', index: 'RequestorEmail', width: 80, sortable: false },
            { name: 'Show', index: 'Show', width: 100, title: false, resizable: false, sortable: false },
            { name: 'SummaryAirDate', index: 'SummaryAirDate', width: 60, sortable: false },
            { name: 'airDate', index: 'airDate', width: 80, hidden: true, sortable: false },
            { name: 'BudgetCode', index: 'BudgetCode', width: 60, sortable: false },
            { name: 'ProducerEdit', index: 'ProducerEdit', formatter: gridProducerEdit, width: 110, title: false, resizable: false, sortable: false },
            { name: 'EditorEdit', index: 'EditorEdit', formatter: gridEditorEdit, width: 110, title: false, resizable: false, sortable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 5,
        rowNum: 10,
        pager: '#MSNBCpager',
        sortname: 'ID',
        sortorder: 'desc'
    });

    $('#TDYGrid').jqGrid({
        datatype: "local",
        data: finalTDYData,
        url: 'clientArray',
        colNames: ['ID', 'TDY/ WTDY FORM ID', 'Requester', 'Contact #', 'Email', 'Show Unit', 'Air Date', 'airDate', 'Craft Editor', 'Additional'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, hidden: true, sorttype: "int", sortable: true },
            { name: 'FormID', index: 'FormID', formatter: gridFormID, width: 100, title: false, resizable: false, sortable: false },
            { name: 'RequestorName', index: 'RequestorName', width: 90, sortable: false },
            { name: 'RequestorContact', index: 'RequestorContact', width: 80, sortable: false },
            { name: 'RequestorEmail', index: 'RequestorEmail', width: 80, sortable: false },
            { name: 'Show', index: 'Show', width: 100, title: false, resizable: false, sortable: false },
            { name: 'SummaryAirDate', index: 'SummaryAirDate', width: 60, sortable: false },
            { name: 'airDate', index: 'airDate', width: 80, hidden: true, sortable: false },
            { name: 'CraftEditor', index: 'CraftEditor', formatter: gridCraftEditor, width: 110, title: false, resizable: false, sortable: false },
            { name: 'Additional', index: 'Additional', formatter: gridAdditional, width: 110, title: false, resizable: false, sortable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: parseInt($('.dashboard-tab').width()) - 5,
        rowNum: 10,
        pager: '#TDYpager',
        sortname: 'ID',
        sortorder: 'desc'
    });
}

function gridFormID(el, cval, opts) {
    return '<div class="imgSec"><img class="editIcon tdyRequest" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                    '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.EditRequestID + '"></div>' +
                    '<div class="editID">' + opts.EditRequestID + '</div>';
}

function gridCraftEditor(el, cval, opts) {
    var returnVal = "";
    var count = 0;
    if (!!opts.AMColdOpen) {
        returnVal = '<b>Cold Open: </b>' + opts.AMColdOpen + '<br/>';
        count++;
    }
    if (!!opts.AMUpdates) {
        returnVal += '<b>Updates: </b>' + opts.AMUpdates + '<br/>';
        count++;
    }
    if (!!opts.AMPreTapes) {
        returnVal += '<b>Pre-Tapes: </b>' + opts.AMPreTapes + '<br/>';
        count++;
    }
    if (!!opts.AMRevisionToBRollsVOSOT) {
        if (count < 3) {
            returnVal += '<b>Revision to B-Rolls/VO/SOT: </b>' + opts.AMRevisionToBRollsVOSOT + '<br/>';
        }
        count++;
    }
    if (!!opts.AMTeasesOpenBody) {
        if (count <= 3) {
            returnVal += '<b>Teases/Open Body: </b>' + opts.AMTeasesOpenBody + '<br/>';
        }
        count++;
    }
    if (!!opts.AMRevisionsToSpotsTracks) {
        if (count <= 3) {
            returnVal += '<b>Revisions to Spots/Tracks: </b>' + opts.AMRevisionsToSpotsTracks + '<br/>';
        }
        count++;
    }
    if (!!opts.AMShowFixes) {
        if (count <= 3) {
            returnVal += '<b>Show Fixes: </b>' + opts.AMShowFixes + '<br/>';
        }
        count++;
    }
    if (!!opts.AMCrashPieces) {
        if (count <= 3) {
            returnVal += '<b>Crash Pieces: </b>' + opts.AMCrashPieces + '<br/>';
        }
        count++;
    }
    if (!!opts.AMNewBRollVOSOT) {
        if (count <= 3) {
            returnVal += '<b>New B-roll/VO/SOT: </b>' + opts.AMNewBRollVOSOT + '<br/>';
        }
        count++;
    }
    if (count > 3) {
        var tot = parseInt(count) - 3;
        returnVal += '<b> + ' + tot.toString() + ' </b>';
    }
    return returnVal;
}

function gridAdditional(el, cval, opts) {
    var returnVal = "";
    var count = 0;
    if (!!opts.AMQuickTurnaroundCrash && opts.AMQuickTurnaroundCrash != "No") {
        returnVal = "Quick Turnaround/Crash <br />";
        count++;
    }
    if (!!opts.AMAudioCorrect && opts.AMAudioCorrect != "No") {
        returnVal += "Audio Correct <br />";
        count++;
    }
    if (!!opts.AMMusic && opts.AMMusic != "No") {
        returnVal += "Music <br />";
        count++;
    }
    if (!!opts.AMEffects && opts.AMEffects != "No") {
        if (count < 3) {
            returnVal += "Effects <br />";
        }
        count++;
    }
    if (!!opts.AMGraphicStills && opts.AMGraphicStills != "No") {
        if (count < 3) {
            returnVal += "Graphics/Stills <br />";
        }
        count++;
    }
    if (!!opts.AMOther && opts.AMOther != "No") {
        if (count < 3) {
            returnVal += "Other - " + opts.AROtherText + " <br />";
        }
        count++;
    }
    if (!!opts.AMColorCorrect && opts.AMColorCorrect != "No") {
        if (count < 3) {
            returnVal += "Color Correct <br />";
        }
        count++;
    }
    if (!!opts.AMAllOfTheAbove && opts.AMAllOfTheAbove != "No") {
        if (count < 3) {
            returnVal += "All of the Above";
        }
        count++;
    }
    if (count > 3) {
        var tot = parseInt(count) - 3;
        returnVal += '<b> + ' + tot.toString() + ' </b>';
    }
    return returnVal;
}

function gridMSNBCFormID(el, cval, opts) {
    return '<div class="imgSec"><img class="editIcon msnbcRequest" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                    '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.EditRequestID + '"></div>' +
                    '<div class="editID">' + opts.EditRequestID + '</div>';
}

function gridProducerEdit(el, cval, opts) {
    var returnVal = "";
    if (!!opts.SFPEOpenPackage && opts.SFPEOpenPackage != "No") {
        returnVal = "<b> Open/Package: </b>" + opts.SFPEOpenPackageHowMany + "<br />";
    }
    if (!!opts.SFPEVOSOT && opts.SFPEVOSOT != "No") {
        returnVal += "<b> VO/SOT: </b>" + opts.SFPEVOSOTHowMany + "<br />";
    }
    if (!!opts.SFPEFixes && opts.SFPEFixes != "No") {
        returnVal += "<b> Fixes: </b>" + opts.SFPEFixesHowMany + "<br />";
    }
    if (!!opts.SFPEWebEdit && opts.SFPEWebEdit != "No") {
        returnVal += "<b> Web Edit: </b>" + opts.SFPEWebEditHowMany + "<br />";
    }
    return returnVal;
}

function gridEditorEdit(el, cval, opts) {
    var returnVal = "";
    if (!!opts.SFEEOpenPackage && opts.SFEEOpenPackage != "No") {
        returnVal = "<b> Open/Package: </b>" + opts.SFEEOpenPackageHowMany + "<br />";
    }
    if (!!opts.SFEEVOSOT && opts.SFEEVOSOT != "No") {
        returnVal += "<b> VO/SOT: </b>" + opts.SFEEVOSOTHowMany + "<br />";
    }
    if (!!opts.SFEEFixes && opts.SFEEFixes != "No") {
        returnVal += "<b> Fixes: </b>" + opts.SFEEFixesHowMany + "<br />";
    }
    if (!!opts.SFEEWebEdit && opts.SFEEWebEdit != "No") {
        returnVal += "<b> Web Edit: </b>" + opts.SFEEWebEditHowMany + "<br />";
    }
    return returnVal;
}

function myFILEINGESTStatus(el, cval, opts) {
    var returnVal = '';
    returnVal = '<div class="imgSec"><img class="editIcon myFIEdit" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                    '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.FileIngestID + '"></div>' +
                     '<div class="contSec"><div class="statusColor fi' + opts.status + '">' + opts.status + '</div>' +
                    '<div class="editID boldText">' + opts.FileIngestID + '</div>';
    return returnVal;
}

function myFIDevices(el, cval, opts) {
    var returnVal = "<div class='outerDate'>";
    if (!!opts.Device) {
        if (opts.Device.indexOf('|') == -1) {
            returnVal += "<div class='innerDate'>" + opts.Device + "</div>";
            returnVal += "<div class='innerDate'>" + opts.Quantity + "</div>";
        }
        else {
            var editArr = opts.Device.split('|');
            var qunArr = opts.Quantity.split('|');
            var excessEditor = false;
            $.each(editArr, function (edInd, edVal) {
                if (edInd < 1) {
                    returnVal += "<div class='innerDate'>" + edVal + "</div>";
                    returnVal += "<div class='innerDate'><b>Qty : " + qunArr[0] + "</b></div>";
                }
                else {
                    excessEditor = true;
                }
            });
        }
        if (excessEditor) {
            returnVal += "<div class='innerDate'>+" + (editArr.length - 1).toString() + "</div>"
        }
    }
    returnVal += "<div";
    return returnVal;
}

function myFICameraType(el, cval, opts) {
    var returnVal = "<div class='outerDate'>";
    if (!!opts.CameraType) {
        if (opts.CameraType.indexOf(';') == -1) {
            returnVal += "<div class='innerDate'>" + opts.CameraType + "</div>";
        }
        else {
            var editArr = opts.CameraType.split(';');
            var excessEditor = false;
            $.each(editArr, function (edInd, edVal) {
                if (edInd < 2) {
                    returnVal += "<div class='innerDate'>" + edVal + "</div>";
                }
                else {
                    excessEditor = true;
                }
            });
        }
        if (excessEditor) {
            returnVal += "<div class='innerDate'>+" + (editArr.length - 2).toString() + "</div>"
        }
    }
    returnVal += "<div";
    return returnVal;
}

function myFIGridUsers(el, cval, opts) {
    return '<b>Req: </b>' + opts.RequestorName + '<br/>' +
            '<b>Prod: </b>' + opts.ProducerName + '<br/>' +
            '<b>Sr. Prod: </b>' + opts.SeniorProducer;
}

function myFIGridLog(el, cval, opts) {
    return '<b>Created: </b>' + opts.Created + '<br/>' +
            '<b>Revised: </b>' + opts.Revised + '<br/>' +
            '<b>Completed: </b>' + opts.Completed;
}

function myEditGridReqStatus(el, cval, opts) {
    var returnVal = '';
    returnVal = '<div class="imgSec"><img class="editIcon myEditEdit" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                    '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.EditRequestID + '"></div>' +
                     '<div class="contSec"><div class="statusColor er' + opts.status + '">' + opts.status + '</div>' +
                    '<div class="editID boldText">' + opts.EditRequestID + '</div>';
    return returnVal;
}

function myEditGridDate(el, cval, opts) {
    var returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerStText'>Edit : </div><div class='innerSTVal'>" + opts.EditStartDate + "</div></div>" +
                    "<div class='innerDate'><div class='innerStText'>Air : </div><div class='innerSTVal'>" + opts.AirDate + "</div></div>" +
                 "</div>";
    return returnVal;
}

function myEditDuration(el, cval, opts) {
    var returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerStText'>Days : </div><div class='innerSTVal'>" + opts.CraftEditDays + "</div></div>" +
                    "<div class='innerDate'><div class='innerStText'>Hours : </div><div class='innerSTVal'>" + opts.CraftEditHours + "</div></div>" +
                    "<div class='innerDate'><div class='innerStText'>Mins : </div><div class='innerSTVal'>" + opts.CraftEditMinutes + "</div></div>" +
                 "</div>";
    return returnVal;
}

function myEditorName(el, cval, opts) {
    var returnVal = "<div class='outerDate'>";
    if (!!opts.Editor) {
        if (opts.Editor.indexOf('|') == -1) {
            returnVal += "<div class='innerDate'>" + opts.Editor + "</div>";
        }
        else {
            var editArr = opts.Editor.split('|');
            var excessEditor = false;
            $.each(editArr, function (edInd, edVal) {
                if (edInd < 2) {
                    returnVal += "<div class='innerDate'>" + edVal + "</div><br />";
                }
                else {
                    excessEditor = true;
                }
            });
        }
        if (excessEditor) {
            returnVal += "<div class='innerDate'><b>+" + (editArr.length - 2).toString() + "</b></div>"
        }
    }
    returnVal += "<div";
    return returnVal;
}

function myEditRoom(el, cval, opts) {
    var returnVal = "<div class='outerDate'>";
    if (!!opts.Room) {
        if (opts.Room.indexOf('|') == -1) {
            returnVal += "<div class='innerDate'>" + opts.Room + "</div>";
        }
        else {
            var editArr = opts.Room.split('|');
            var excessEditor = false;
            $.each(editArr, function (edInd, edVal) {
                if (edInd < 2) {
                    returnVal += "<div class='innerDate'>" + edVal + "<br /></div>";
                }
                else {
                    excessEditor = true;
                }
            });
        }
        if (excessEditor) {
            returnVal += "<div class='innerDate'><b>+" + (editArr.length - 2).toString() + "</b></div>"
        }
    }
    returnVal += "<div";
    return returnVal;
}

function myEditGridUsers(el, cval, opts) {
    return '<b>Req: </b>' + opts.RequestorName + '<br/>' +
            '<b>Prod: </b>' + opts.ProducerName + '<br/>' +
            '<b>Sr. Prod: </b>' + opts.SeniorProducer;
}

function myCrewGridReqStatus(el, cval, opts) {
    var returnVal = '';
    var editStatus = "";
    if (!!opts.EditStatus) {
        editStatus = opts.EditStatus.toLowerCase()
    }
    returnVal = '<div class="imgSec"><img class="editIcon myCrewEdit" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                    '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.CrewRequestID + '"></div>' +
                     '<div class="contSec"><div class="statusColor crew' + opts.RequestStatus.toLowerCase() + '">' + opts.RequestStatus + '</div>' +
                    '<div class="editID boldText">' + opts.CrewRequestID + '</div>';
    return returnVal;
}

function myCrewGridDate(el, cval, opts) {
    var returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerStText'>Start Date : </div><div class='innerSTVal'>" + opts.StartDate1 + "</div><div class='innerDays boldText'>(" + opts.DaysShoot + ")</div></div>" +
                    "<div class='innerDate'><div class='innerStText'>End Date : </div><div class='innerSTVal'>" + opts.EndDate1 + "</div></div>" +
                    "<div class='innerDate'>(" + opts.ShootStatus + ")</div>" +
                 "</div>";
    return returnVal;
}

function myCrewGridSlugTalentStory(el, cval, opts) {
    var returnVal = "<div class='outerDate'>" +
                    "<div class='innerSTVal boldText'>" + opts.AssignmentSlug + "</div><br />" +
                    "<div class='innerSTVal'>" + opts.Talent + "</div><br />";
    if (!!opts.StoryName) {
        returnVal += "<div class='innerSTVal'>(" + opts.StoryName + ")</div>";
    }
    returnVal += "</div>";
    return returnVal;
}

function myCrewGridShow(el, cval, opts) {
    var returnVal = "";
    if (!!opts.myCrewShowUnit) {
        if (opts.myCrewShowUnit.indexOf('|') == -1) {
            returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerSTVal'>" + opts.myCrewShowUnit + "</div></div>" +
                    "<div class='innerDate'><div class='innerStText'>Budget Code : </div><div class='innerSTVal boldText'>" + opts.myCrewBudgetCode + "</div></div>" +
                 "</div>";
        }
        else {
            var totShow = opts.myCrewShowUnit.split('|');
            var totBug = opts.myCrewBudgetCode.split('|');
            returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerSTVal'>" + totShow[0] + "</div></div>" +
                    "<div class='innerDate'><div class='innerStText'>Budget Code : </div><div class='innerSTVal boldText'>" + totBug[0] + "</div></div>" +
                    "<div class='innerDate boldText'>+" + (totShow.length - 1).toString() + "</div>" +
                 "</div>";
        }
    }
    return returnVal;
}

function myCrewGridResources(el, cval, opts) {
    var returnVal = "";
    if (!!opts.myCrewResName) {
        if (opts.myCrewResName.indexOf('|') == -1) {
            returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerSTVal boldText'>" + opts.myCrewResRole + " :</div></div>" +
                    "<div class='innerDate'><div class='innerSTVal '>" + opts.myCrewResName + "</div></div>" +
                 "</div>";
        }
        else {
            var totRes = opts.myCrewResName.split('|');
            returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerSTVal boldText'>" + opts.myCrewResRole.split('|')[0] + " :</div></div>" +
                    "<div class='innerDate'><div class='innerSTVal '>" + totRes[0] + "</div></div>" +
                    "<div class='innerDate boldText'>+" + (totRes.length - 1).toString() + "</div>" +
                 "</div>";
        }
    }
    return returnVal;
}

function myCrewGridSuggestedActual(el, cval, opts) {
    var imgStatus = "none";
    var approvalStatus = "NA";
    if (!!opts.SuggestedResources && !!opts.SelectedResources) {
        if (opts.SelectedResources > opts.SuggestedResources) {
            imgStatus = "block";
            if (opts.Approval == "NA") {
                approvalStatus = "Pending";
            }
            else {
                approvalStatus = opts.Approval;
            }
        }
    }
    var returnVal = "<div class='outerDate'>" +
                    "<div class='innerDate'><div class='innerStText boldText'>Suggested : </div><div class='innerSTVal'>" + opts.SuggestedResources + "</div></div>" +
                    "<div class='innerDate'><div class='innerStText boldText'>Actual : </div><div class='innerSTVal'>" + opts.SelectedResources + "</div><div class='imgSec' style='display:" + imgStatus + "'></div></div>" +
                    "<div class='innerDate'><div class='innerStText boldText'>Override : </div><div class='innerSTVal'>" + approvalStatus + "</div></div>" +
                 "</div>";
    return returnVal;
}

function myCrewGridUsers(el, cval, opts) {
    return '<b>Req: </b>' + opts.Requester + '<br/>' +
            '<b>Prod: </b>' + opts.Producer + '<br/>' +
            '<b>Sr. Prod: </b>' + opts.Approver;
}

function myCrewGridLog(el, cval, opts) {
    return '<b>Created: </b>' + opts.Created + '<br/>' +
            '<b>Modified: </b>' + opts.Modified + '<br/>' +
            '<b>Updated By: </b>' + opts.ModifiedBy;
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function formatExcatDate(date) {
    var givenDate = new Date(date);
    return parseInt(givenDate.getMonth() + 1) + "/" + givenDate.getDate() + "  " + formatAMPM(givenDate)
}

function ReadList(url, listName, query) {
    var serverurl =  "/sites/bcast_prodreq"
    var results = [];
    $.ajax({
        url: serverurl + "/_api/Web/Lists/GetByTitle('" + listName + "')/items" + query,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            results = data.d.results;
        },
        error: function (data) {
            console.log(data);
        }
    });
    return results;
}
function getListCount(listName) {
    var serverurl = "/sites/bcast_prodreq";
    var results = [];
    $.ajax({
        url: serverurl + "/_api/web/lists/getbytitle('" + listName + "')/itemcount",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        async: false,
        success: function (data) {
            results = data.d.ItemCount;
        },
        error: function (data) {
            console.log(data);
        }
    });
    return results;
}
function openBasicDialog(tUrl, tTitle) {
    var options = {
        url: tUrl,
        title: tTitle,
        width: 1200,
        dialogReturnValueCallback: CloseCallback
    };
    //SP.UI.ModalDialog.showModalDialog(options);
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}
function CloseCallback(strReturnValue, result, target) {
    //var crewRequestData = ReadList("", "CrewRequest", "?$select=Id,Title,RequestStatus,CrewStatus,AssignmentSlug,CrewAddress,StoryName,Requester&$filter=CrewStatus eq 'Step5' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend'&$orderby=ID desc");
    //var crewRequestData = ReadList("", "CrewRequest", "?$select=Id,Title,RequestStatus,CrewRequestID,CrewStatus,AssignmentSlug,CrewAddress,StoryName,Requester,CrewType&$filter=(((CrewStatus eq 'Step5' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and CrewType eq 'General Crew Request') or ((CrewStatus eq 'Step4' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and (CrewType eq 'Breaking News' or CrewType eq 'Correspondent Live Shot')) or ((CrewStatus eq 'Step1' or CrewStatus eq 'Save' or CrewStatus eq 'SaveRevise' or CrewStatus eq 'SaveSend') and CrewType eq 'Bureau Camera'))&$orderby=ID desc");
    //if (crewRequestData.length > 0) {
    //    $('#MyRequestGrid').dataTable().fnClearTable();
    //    $('#MyRequestGrid').dataTable().fnAddData(crewRequestData);
    //}
    //var editRequestData = ReadList("", "EditRequest", "?$select=Id,Title,EditStatus,EditType,EditRequestID,Slug,RequestorName&$filter=EditStatus eq 'FormSubmit' &$orderby=ID desc");
    //if (editRequestData.length > 0) {
    //    $('#EditRequestGrid').dataTable().fnClearTable();
    //    $('#EditRequestGrid').dataTable().fnAddData(editRequestData);
    //}

    //var fileIngestData = ReadList("", "FileIngest", "?$select=Id,Title,RequestorName,FileIngestID,Slug,Workgroup,IngestStatus&$filter=IngestStatus eq 'FormComplete' &$orderby=ID desc");
    //if (fileIngestData.length > 0) {
    //    $('#FileIngestGrid').dataTable().fnClearTable();
    //    $('#FileIngestGrid').dataTable().fnAddData(fileIngestData);
    //}
}
function peoplePickerClear(value) {
    var controlVal = "";
    if (!!value) {
        controlVal = value.split('(')[0];
    }
    return controlVal;
}
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(element.attr('alt')).select();
    document.execCommand("copy");
    $temp.remove();
}
function dateObj(dateVal) {
    if (!!dateVal) {
        if (dateVal.indexOf('T') == -1) {
            return new Date(dateVal)
        }
        else {
            return new Date(dateVal.split('T')[0]);
        }
    }
}
function dateObjString(dateObj) {
    if (!!dateObj) {
        var dateVal = new Date(dateObj);
        var dateString = dateVal.toString();
        var dateArr = dateString.split(' ');
        return dateArr[1] + " " + dateArr[2];
    }
}
function dateString(dateObj) {
    if (!!dateObj) {
        var dateArr = dateObj.split('-');
        return dateArr[1] + "/" + dateArr[2].substring(0, 2);
    }
}
function nullCheck(stringVal) {
    var returnVal = "";
    if (!!stringVal) {
        returnVal = stringVal;
    }
    return returnVal;
}
function loadGrid(gridElement, data) {
    gridElement.jqGrid('clearGridData').jqGrid('setGridParam', { data: data }).trigger('reloadGrid');
}