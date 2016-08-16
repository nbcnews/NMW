var finalEditRequestData = [];
var finalLongRequestData = [];
var finalMSNBCData = [];
var finalTDYData = [];
var filterEditRequestData = [];
var filterLongRequestData = [];
var filterMSNBCData = [];
var filterTDYData = [];
var erStartDate = "";
var erEndDate = "";
var lfStartDate = "";
var lfEndDate = "";
var msnbcStartDate = "";
var msnbcEndDate = "";
var tdyStartDate = "";
var tdyEndDate = "";
function openBasicDialog(tUrl, tTitle) {
    var options = {
        url: tUrl,
        title: tTitle,
        width: 1200,
        dialogReturnValueCallback: CloseCallback
    };
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}
function CloseCallback(strReturnValue, result, target) {
    var editRequestData = ReadList("", "EditRequest", "?$select=Id,Title,EditStatus,EditType,EditRequestID,Slug,RequestorName&$filter=EditStatus eq 'FormSubmit' &$orderby=ID desc");
    if (editRequestData.length > 0) {
        $('#EditRequestGrid').dataTable().fnClearTable();
        $('#EditRequestGrid').dataTable().fnAddData(editRequestData);
    }
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
        return new Date(dateVal)
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
        return dateArr[1] + "/" + dateArr[2];
    }
}
function nullCheck(stringVal) {
    var returnVal = "";
    if (!!stringVal) {
        returnVal = stringVal;
    }
    return returnVal;
}
function daydiff(first, second) {
    var returnVal = 0;
    if (!!second) {
        returnVal = (first - new Date(second)) / (1000 * 60 * 60 * 24)
    }
    return returnVal;
}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    //CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
$(function () {
    $('.button-export').click(function () {

        if ($('.dashboard-tab .active').attr('id') == "das-EDR") {
            if (filterEditRequestData.length == 0) {
                JSONToCSVConvertor(JSON.stringify(finalEditRequestData), "Report", true);
            }
            else {
                JSONToCSVConvertor(JSON.stringify(filterEditRequestData), "Report", true);
            }
        }
        else if ($('.dashboard-tab .active').attr('id') == "das-LFER") {
            if (filterLongRequestData.length == 0) {
                JSONToCSVConvertor(JSON.stringify(finalLongRequestData), "Report", true);
            }
            else {
                JSONToCSVConvertor(JSON.stringify(filterLongRequestData), "Report", true);
            }
        }
        else if ($('.dashboard-tab .active').attr('id') == "das-MSNBC") {
            if (filterMSNBCData.length == 0) {
                JSONToCSVConvertor(JSON.stringify(finalMSNBCData), "Report", true);
            }
            else {
                JSONToCSVConvertor(JSON.stringify(filterMSNBCData), "Report", true);
            }
        }
        else if ($('.dashboard-tab .active').attr('id') == "das-TDY") {
            if (filterTDYData.length == 0) {
                JSONToCSVConvertor(JSON.stringify(finalTDYData), "Report", true);
            }
            else {
                JSONToCSVConvertor(JSON.stringify(filterTDYData), "Report", true);
            }
        }
    });

    $('#hierarchy').click(function () {
        $('#show-items').addClass('active');
        return false;
    });
    $('#hierarchy-long').click(function () {
        $('#show-items-long').addClass('active');
        return false;
    });
    $('#hierarchy-edit-location').click(function () {
        $('#show-items-edit-location').addClass('active');
        return false;
    });
    $('#hierarchy-long-location').click(function () {
        $('#show-items-long-location').addClass('active');
        return false;
    });

    $(document).click(function () {
        $('#show-items').removeClass('active');
        $('#show-items-long').removeClass('active');
        $('#show-items-edit-location').removeClass('active');
        $('#show-items-long-location').removeClass('active');
    });

    $('#show-items li').click(function () { //button click class name is myDiv
        $('#hierarchy').text("");
        $('#hierarchy').text($(this).find('a').first().text());
        $('#show-items').removeClass('active');
        filterContraint();
        return false;
    });

    $('#show-items-long li').click(function () { //button click class name is myDiv
        $('#hierarchy-long').text("");
        $('#hierarchy-long').text($(this).find('a').first().text());
        $('#show-items-long').removeClass('active');
        filterContraintLongForm();
        return false;
    });

    $('#show-items-edit-location li').click(function () { //button click class name is myDiv
        $('#hierarchy-edit-location').text("");
        $('#hierarchy-edit-location').text($(this).find('a').first().text());
        $('#show-items-edit-location').removeClass('active');
        filterContraint();
        return false;
    });

    $('#show-items-long-location li').click(function () { //button click class name is myDiv
        $('#hierarchy-long-location').text("");
        $('#hierarchy-long-location').text($(this).find('a').first().text());
        $('#show-items-long-location').removeClass('active');
        filterContraintLongForm();
        return false;
    });

    $('#editgrid-searchItem').keyup(function () {
        var textEntered = $(this).val();
        var loadData = [];
        if (!!textEntered) {
            if (filterEditRequestData.length > 0) {
                loadData = $.grep(filterEditRequestData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Title.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CreatedDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.LocationofEdit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Network.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.StoryName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CraftEditStartDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            else {
                loadData = $.grep(finalEditRequestData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Title.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CreatedDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.LocationofEdit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Network.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.StoryName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CraftEditStartDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            loadGrid($('#EditRequestGrid'), loadData);
        }
        else {
            filterContraint()
            if (filterEditRequestData.length == 0) {
                if (!!erStartDate && !!erEndDate) {
                    filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                        return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                            dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
                    });
                    loadGrid($('#EditRequestGrid'), filterEditRequestData);
                }
                else {
                    loadGrid($('#EditRequestGrid'), finalEditRequestData);
                }
            }
            else {
                loadGrid($('#EditRequestGrid'), filterEditRequestData);
            }
        }
    });

    $('#longgrid-searchItem').keyup(function () {
        var textEntered = $(this).val();
        var loadData = [];
        if (!!textEntered) {
            if (filterLongRequestData.length > 0) {
                loadData = $.grep(filterLongRequestData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Title.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CreatedDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.LocationofEdit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Business.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.StoryName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CraftEditStartDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            else {
                loadData = $.grep(finalLongRequestData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Title.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditStatus.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CreatedDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.LocationofEdit.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Business.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Slug.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.StoryName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.CraftEditStartDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.ProducerName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SeniorProducer.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            loadGrid($('#LongFormGrid'), loadData);
        }
        else {
            filterContraintLongForm();
            if (filterLongRequestData.length == 0) {
                if (!!lfStartDate && !!lfEndDate) {
                    filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                        return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                            dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
                    });
                    loadGrid($('#LongFormGrid'), filterLongRequestData);
                }
                else {
                    loadGrid($('#LongFormGrid'), finalLongRequestData);
                }
            }
            else {
                loadGrid($('#LongFormGrid'), filterLongRequestData);
            }
        }
    });

    $('#msnbcgrid-searchItem').keyup(function () {
        var textEntered = $(this).val();
        var loadData = [];
        if (!!textEntered) {
            if (filterMSNBCData.length > 0) {
                loadData = $.grep(filterMSNBCData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorContact.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorEmail.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.BudgetCode.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            else {
                loadData = $.grep(finalMSNBCData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorContact.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorEmail.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.BudgetCode.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            loadGrid($('#MSNBCGrid'), loadData);
        }
        else {
            if (!!msnbcStartDate && !!msnbcEndDate) {
                loadData = $.grep(filterMSNBCData, function (a) {
                    return dateObj(msnbcStartDate) <= dateObj(a.airDate) && dateObj(msnbcEndDate) >= dateObj(a.airDate)
                });
                loadGrid($('#MSNBCGrid'), loadData);
            }
            else {
                loadGrid($('#MSNBCGrid'), finalMSNBCData);
            }
        }
    });

    $('#tdygrid-searchItem').keyup(function () {
        var textEntered = $(this).val();
        var loadData = [];
        if (!!textEntered) {
            if (filterTDYData.length > 0) {
                loadData = $.grep(filterTDYData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorContact.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorEmail.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            else {
                loadData = $.grep(finalTDYData, function (a) {
                    return a.ID.toString().toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.EditRequestID.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorName.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorContact.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.RequestorEmail.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.Show.toUpperCase().indexOf(textEntered.toUpperCase()) != -1 ||
                        a.SummaryAirDate.toUpperCase().indexOf(textEntered.toUpperCase()) != -1
                })
            }
            loadGrid($('#TDYGrid'), loadData);
        }
        else {
            if (!!tdyStartDate && !!tdyEndDate) {
                loadData = $.grep(filterTDYData, function (a) {
                    return dateObj(tdyStartDate) <= dateObj(a.airDate) && dateObj(tdyEndDate) >= dateObj(a.airDate)
                });
                loadGrid($('#TDYGrid'), loadData);
            }
            else {
                loadGrid($('#TDYGrid'), finalTDYData);
            }
        }
    });

    //var showunitCount = getListCount("ShowUnit");
    //var showUnitData = ReadList("", "ShowUnit", "?$select=ShowUnitTitle,DefaultBudgetCode,ID&$top=" + showunitCount);
    //$('#selShows').find('option:not(:first)').remove();
    //$.each(showUnitData, function (index, data) {
    //    $('#selShows').append('<option id="' + data.ID + '">' + data.ShowUnitTitle + '</option>');
    //});

    //var locationData = ReadList("", "LocationOfEdit", "?$select=Title,ID");
    //$('#selLocation, #selLocation-long').find('option:not(:first)').remove();
    //$.each(locationData, function (index, data) {
    //    $('#selLocation, #selLocation-long').append('<option id="' + data.ID + '">' + data.Title + '</option>');
    //});
    var editRequestCount = getListCount("EditRequest");
    //var editRequestData = ReadList("", "EditRequest", "?$select=ID,Id,Title,EditStatus,EditType,EditRequestID,Slug,RequestorName,Created,LocationofEdit,Network,StoryName,EditStartDate,AirDate,ProducerName,SeniorProducer,IsCrashEdit,IsCraftEditorNeeded,IsProducerEditCompleted,ERRequestStatus&$filter=EditStatus eq 'FormSubmit' and EditType eq 'Edit Request' &$top=" + editRequestCount);
    var editRequestData = ReadList("", "EditRequest", "?$select=ID,Id,Title,Business,SFPEOpenPackage,SFPEVOSOT,SFPEFixes,SFPEWebEdit,SFEEOpenPackage,SFEEVOSOT,SFEEFixes,SFEEWebEdit,SFPEOpenPackageHowMany,SFPEVOSOTHowMany,SFPEFixesHowMany,SFPEWebEditHowMany,SFEEOpenPackageHowMany,SFEEVOSOTHowMany,SFEEFixesHowMany,SFEEWebEditHowMany,AMColdOpen,AMRevisionToBRollsVOSOT,AMShowFixes,AMUpdates,AMTeasesOpenBody,AMCrashPieces,AMPreTapes,AMRevisionsToSpotsTracks,AMNewBRollVOSOT,AMQuickTurnaroundCrash,AMMusic,AMGraphicStills,AMColorCorrect,AMAudioCorrect,AMEffects,AMOther,AMAllOfTheAbove,AROtherText,EditStatus,RequestorContact,RequestorEmail,ShowUnit,BudgetCode,EditType,EditRequestID,Slug,RequestorName,Created,LocationofEdit,Network,StoryName,EditStartDate,AirDate,ProducerName,SeniorProducer,IsCrashEdit,IsCraftEditorNeeded,IsProducerEditCompleted,IsAssistantProducerEditRequired,ERRequestStatus&$filter=EditStatus eq 'FormSubmit' &$orderby=ID desc&$top=" + editRequestCount);
    var er_showunitCount = getListCount("ER_ShowUnit");
    var editShowData = ReadList("", "ER_ShowUnit", "?$select=Id,Title,RequestID&$top=" + er_showunitCount);
    finalEditRequestData = [];
    var editShowItem = [];
    var statusIndex = 0;
    $.each(editRequestData, function (editInd, editVal) {
        var Showunit = "";
        var status = 'New';
        if (!!editVal.ERRequestStatus) {
            status = editVal.ERRequestStatus
        }
        var crashEdit = "No";
        if (!!editVal.IsCrashEdit) {
            crashEdit = editVal.IsCrashEdit;
        }
        var location = "";
        if (!!editVal.LocationofEdit) {
            location = editVal.LocationofEdit;
        }
        if (editVal.EditType == "Edit Request") {
            if (editShowData.length > 0) {
                editShowItem = [];
                editShowItem = $.grep(editShowData, function (a) {
                    return a.RequestID == editVal.ID;
                });
                $.each(editShowItem, function (editShowInd, editShowVal) {
                    if (editShowInd == 0) {
                        Showunit = editShowVal.Title
                    }
                    else {
                        Showunit += " , " + editShowVal.Title
                    }
                });
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
            var editStartDate = "TBD";
            if (!!editVal.EditStartDate) {
                editStartDate = editVal.EditStartDate
            }
            finalEditRequestData.push({
                ID: editVal.ID,
                daydiff: daydiff(new Date(), editVal.AirDate),
                Title: editVal.Title,
                EditRequestID: nullCheck(editVal.EditRequestID),
                EditStatus: status,
                statusIndex: statusIndex,
                CreatedDate: dateObjString(editVal.Created),
                Show: Showunit,
                LocationofEdit: location,
                Network: nullCheck(editVal.Network),
                Slug: nullCheck(editVal.Slug),
                StoryName: nullCheck(editVal.StoryName),
                CraftEditStartDate: nullCheck(dateString(editVal.EditStartDate)),
                startDate: editStartDate,
                airDate: editVal.AirDate,
                SummaryAirDate: nullCheck(dateString(editVal.AirDate)),
                RequestorName: peoplePickerClear(editVal.RequestorName),
                ProducerName: peoplePickerClear(editVal.ProducerName),
                SeniorProducer: peoplePickerClear(editVal.SeniorProducer),
                IsCrashEdit: crashEdit,
                IsCraftEditorNeeded: editVal.IsCraftEditorNeeded,
                IsProducerEditCompleted: editVal.IsProducerEditCompleted
            });
        }
        else if (editVal.EditType == "Long Form Edit Request") {
            if (status.trim() == "New") {
                statusIndex = 1;
            }
            else if (status.trim() == "Revised") {
                statusIndex = 2;
            }
            else {
                statusIndex = 3;
            }
            var editStartDate = "TBD";
            if (!!editVal.EditStartDate) {
                editStartDate = editVal.EditStartDate
            }
            finalLongRequestData.push({
                ID: editVal.ID,
                daydiff: daydiff(new Date(), editVal.AirDate),
                Title: editVal.Title,
                EditRequestID: nullCheck(editVal.EditRequestID),
                EditStatus: status,
                statusIndex: statusIndex,
                CreatedDate: dateObjString(editVal.Created),
                Show: nullCheck(editVal.ShowUnit),
                LocationofEdit: location,
                Business: nullCheck(editVal.Business),
                Slug: nullCheck(editVal.Slug),
                StoryName: nullCheck(editVal.StoryName),
                CraftEditStartDate: nullCheck(dateString(editVal.EditStartDate)),
                startDate: editStartDate,
                airDate: editVal.AirDate,
                SummaryAirDate: nullCheck(dateString(editVal.AirDate)),
                RequestorName: peoplePickerClear(editVal.RequestorName),
                ProducerName: peoplePickerClear(editVal.ProducerName),
                SeniorProducer: peoplePickerClear(editVal.SeniorProducer),
                IsCrashEdit: crashEdit,
                IsCraftEditorNeeded: editVal.IsCraftEditorNeeded,
                IsProducerEditCompleted: editVal.IsProducerEditCompleted,
                IsAssistantProducerEditRequired: editVal.IsAssistantProducerEditRequired
            });
        }
        else if (editVal.EditType == "MSNBC Short Form") {
            finalMSNBCData.push({
                ID: editVal.ID,
                daydiff: daydiff(new Date(), editVal.AirDate),
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
                daydiff: daydiff(new Date(), editVal.AirDate),
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

    var editNew = $.grep(finalEditRequestData, function (a) {
        return a.EditStatus == "New";
    });
    $('#ERQ-Value').text("(" + editNew.length + ")");
    var longNew = $.grep(finalLongRequestData, function (a) {
        return a.EditStatus == "New";
    });
    $('#long-Value').text("(" + longNew.length + ")");
    var gridWidth = parseInt($('.dashboard-tab').width()) - 20;
    $('#EditRequestGrid').jqGrid({
        datatype: "local",
        data: finalEditRequestData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'EDIT REQ STATUS', 'Show', 'Location', 'Network', 'Slug/Story', 'startDate', 'Edit Start', 'Air Date', 'Users', 'Edit Information'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sortable: false, hidden: true, sorttype: "int" },
            { name: 'statusIndex', index: 'statusIndex', width: 60, sortable: false, hidden: true },
            { name: 'EDITREQSTATUS', index: 'EDITREQSTATUS', formatter: gridEditReqStatus, width: 100, title: false, resizable: false, sortable: false },
            { name: 'Show', index: 'Show', width: 90, sortable: false },
            { name: 'LocationofEdit', index: 'LocationofEdit', width: 80, sortable: false },
            { name: 'Network', index: 'Network', width: 80, sortable: false },
            { name: 'Slug', index: 'Slug', formatter: gridSlugorStory, width: 100, title: false, resizable: false, sortable: false },
            { name: 'startDate', index: 'startDate', width: 60, hidden: true, sortable: false },
            { name: 'CraftEditStartDate', index: 'CraftEditStartDate', width: 80, sortable: false },
            { name: 'SummaryAirDate', index: 'SummaryAirDate', width: 80, sortable: false },
            { name: 'Users', index: 'Users', formatter: gridUsers, width: 110, title: false, resizable: false, sortable: false },
            { name: 'EditInfo', index: 'EditInfo', formatter: gridEditInfo, width: 110, title: false, resizable: false, sortable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: gridWidth,
        rowNum: 10,
        pager: '#Editgridpager',
        grouping: false,
        multiSort: true,
        sortname: 'statusIndex asc, ID',
        sortorder: 'desc',
        groupingView: {
            groupField: ['startDate'],
            groupColumnShow: [false],
            groupText: ['Start Date: <b>{0}({1}) </b>'],
            groupCollapse: true,
            groupOrder: ['desc']
        }
    });

    $('#LongFormGrid').jqGrid({
        datatype: "local",
        data: finalLongRequestData,
        url: 'clientArray',
        colNames: ['ID', 'statusIndex', 'EDIT REQ STATUS', 'Show', 'Location', 'Business', 'Slug/Story', 'startDate', 'Edit Start', 'Air Date', 'Users', 'Edit Information'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sortable: false, hidden: true, sorttype: "int" },
            { name: 'statusIndex', index: 'statusIndex', width: 60, sortable: false, hidden: true },
            { name: 'EDITREQSTATUS', index: 'EDITREQSTATUS', formatter: gridLongReqStatus, width: 100, title: false, resizable: false, sortable: false },
            { name: 'Show', index: 'Show', width: 90, sortable: false },
            { name: 'LocationofEdit', index: 'LocationofEdit', width: 80, sortable: false },
            { name: 'Business', index: 'Business', width: 80, sortable: false },
            { name: 'Slug', index: 'Slug', formatter: gridSlugorStory, width: 100, title: false, resizable: false, sortable: false },
            { name: 'startDate', index: 'startDate', width: 60, hidden: true, sortable: false },
            { name: 'CraftEditStartDate', index: 'CraftEditStartDate', width: 80, sortable: false },
            { name: 'SummaryAirDate', index: 'SummaryAirDate', width: 80, sortable: false },
            { name: 'Users', index: 'Users', formatter: gridUsers, width: 110, title: false, resizable: false, sortable: false },
            { name: 'EditInfo', index: 'EditInfo', formatter: gridLongInfo, width: 110, title: false, resizable: false, sortable: false }
        ],
        multiselect: false,
        caption: "",
        height: 'auto',
        width: gridWidth,
        rowNum: 10,
        pager: '#Longgridpager',
        grouping: false,
        multiSort: true,
        sortname: 'statusIndex asc, ID',
        sortorder: 'desc',
        groupingView: {
            groupField: ['startDate'],
            groupColumnShow: [false],
            groupText: ['Start Date: <b>{0}({1}) </b>'],
            groupCollapse: true,
            groupOrder: ['desc']
        }
    });

    $('#TDYGrid').jqGrid({
        datatype: "local",
        data: finalTDYData,
        url: 'clientArray',
        colNames: ['ID', 'FORM ID', 'Requester', 'Contact #', 'Email', 'Show Unit', 'Air Date', 'airDate', 'Craft Editor', 'Additional'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
        colModel: [
            { name: 'ID', index: 'ID', width: 60, sorttype: "int", hidden: true, sortable: true },
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
        width: gridWidth,
        rowNum: 10,
        pager: '#TDYgridpager',
        grouping: false,
        sortname: 'ID',
        sortorder: 'desc',
        groupingView: {
            groupField: ['airDate'],
            groupColumnShow: [false],
            groupText: ['Air Date: <b>{0}({1}) </b>'],
            groupCollapse: true,
            groupOrder: ['desc']
        }
    });

    $('#MSNBCGrid').jqGrid({
        datatype: "local",
        data: finalMSNBCData,
        url: 'clientArray',
        colNames: ['ID', 'FORM ID', 'Requester', 'Contact #', 'Email', 'Show Unit', 'Air Date', 'airDate', 'Budget Code', 'Producer Edit', 'Editor Edit'],
        //colNames: ['ID', 'Show', 'Location', 'Network', 'Edit Start', 'Air Date'],
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
        width: gridWidth,
        rowNum: 10,
        pager: '#MSNBCgridpager',
        grouping: false,
        sortname: 'ID',
        sortorder: 'desc',
        groupingView: {
            groupField: ['airDate'],
            groupColumnShow: [false],
            groupText: ['Air Date: <b>{0}({1}) </b>'],
            groupCollapse: true,
            groupOrder: ['desc']
        }
    });

    $('#longDateView').click(function () {
        if ($(this).text().trim() == "View by Date") {
            $('#LongFormGrid').setGridParam({ grouping: true, rowNum: finalLongRequestData.length }).trigger('reloadGrid');
            $(this).text("View by Status");
        }
        else {
            $('#LongFormGrid').setGridParam({ grouping: false, rowNum: 10 }).trigger('reloadGrid');
            $(this).text("View by Date");
        }
    });

    $('#editDateView').click(function () {
        if ($(this).text().trim() == "View by Date") {
            $('#EditRequestGrid').setGridParam({ grouping: true, rowNum: finalEditRequestData.length }).trigger('reloadGrid');
            $(this).text("View by Status");
        }
        else {
            $('#EditRequestGrid').setGridParam({ grouping: false, rowNum: 10 }).trigger('reloadGrid');
            $(this).text("View by Date");
        }
    });

    function gridEditReqStatus(el, cval, opts) {
        return '<div class="imgSec"><img class="editIcon editRequest" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                        '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.EditRequestID + '"></div>' +
                        '<div class="contSec"><div class="statusColor er' + opts.EditStatus + '">' + opts.EditStatus + '</div>' +
                        '<div class="editID">' + opts.EditRequestID + '</div>' +
                        '<div class="Created">Created ' + opts.CreatedDate + '</div></div>';
    }
    function gridLongReqStatus(el, cval, opts) {
        return '<div class="imgSec"><img class="editIcon longRequest" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                        '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.EditRequestID + '"></div>' +
                        '<div class="contSec"><div class="statusColor er' + opts.EditStatus + '">' + opts.EditStatus + '</div>' +
                        '<div class="editID">' + opts.EditRequestID + '</div>' +
                        '<div class="Created">Created ' + opts.CreatedDate + '</div></div>';
    }

    function gridMSNBCFormID(el, cval, opts) {
        return '<div class="imgSec"><img class="editIcon msnbcRequest" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
                        '<img class="copyIcon" src="/sites/bcast_prodreq/Style%20Library/CustomForms/EditDashboard/Images/copy.png" alt="' + opts.EditRequestID + '"></div>' +
                        '<div class="editID">' + opts.EditRequestID + '</div>';
    }

    function gridFormID(el, cval, opts) {
        return '<div class="imgSec"><img class="editIcon tdyRequest" src="/sites/bcast_prodreq/Style%20Library/CustomForms/ProducerRequest/images/edit_icon.png" alt="' + opts.ID + '">' +
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

    function gridSlugorStory(el, cval, opts) {
        return '<b>' + opts.Slug + '-' + opts.StoryName + '</b>';
    }

    function gridUsers(el, cval, opts) {
        return '<b>Req: </b>' + opts.RequestorName + '<br/>' +
                '<b>Prod: </b>' + opts.ProducerName + '<br/>' +
                '<b>Sr. Prod: </b>' + opts.SeniorProducer;
    }

    function gridLongInfo(el, cval, opts) {
        return '<b>Crash Edit: </b>' + opts.IsCrashEdit + '<br/>' +
                '<b>Craft Editor: </b>' + opts.IsCraftEditorNeeded + '<br/>' +
                '<b>Producer Edit: </b>' + opts.IsProducerEditCompleted + '<br/>' +
                '<b>Assistant Editor Edit: </b>' + opts.IsAssistantProducerEditRequired;
    }

    function gridEditInfo(el, cval, opts) {
        return '<b>Crash Edit: </b>' + opts.IsCrashEdit + '<br/>' +
                '<b>Craft Editor: </b>' + opts.IsCraftEditorNeeded + '<br/>' +
                '<b>Producer Edit: </b>' + opts.IsProducerEditCompleted;
    }

    $(document).on("click", ".editRequest", function () {
        openBasicDialog("/sites/bcast_prodreq/Pages/ER-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
    });

    $(document).on("click", ".longRequest", function () {
        openBasicDialog("/sites/bcast_prodreq/Pages/LF-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
    });

    $(document).on("click", ".msnbcRequest", function () {
        openBasicDialog("/sites/bcast_prodreq/Pages/MSNBC-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
    });

    $(document).on("click", ".tdyRequest", function () {
        openBasicDialog("/sites/bcast_prodreq/Pages/TdyWtdy-Fulfiller.aspx?CRID=" + $(this).attr('alt'), " ");
    });

    $(document).on("click", ".copyIcon", function () {
        copyToClipboard($(this));
    });
    //$('.dash-datepicker-icon').dateRangePicker({
    //    inline: false,
    //    mode: 'single',
    //    container: '.calender-container',
    //    alwaysOpen: false,
    //    singleMonth: true,
    //    stickyMonths: true,
    //    hoveringTooltip: function (days, startTime, hoveringTime) {
    //        //$('#shootdays').val(days);
    //    },
    //    setValue: function (s, s1, s2) {
    //        filterContraint();
    //        if (filterEditRequestData.length > 0) {
    //            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
    //                return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
    //                    dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
    //            });
    //            loadGrid($('#EditRequestGrid'), filterEditRequestData);
    //        }
    //        else {
    //            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
    //                return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
    //                    dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
    //            });
    //            loadGrid($('#EditRequestGrid'), filterEditRequestData);
    //        }
    //    }
    //});

    $('.edit-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-container-edit',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            erStartDate = s1;
            erEndDate = s2;
            filterContraint();
            if (filterEditRequestData.length > 0) {
                filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                    return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
                        dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#EditRequestGrid'), filterEditRequestData);
            }
            else {
                filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                    return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
                        dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#EditRequestGrid'), filterEditRequestData);
            }
        }
    });

    $('.long-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-conatainer-long',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            lfStartDate = s1;
            lfEndDate = s2;
            filterContraintLongForm();
            if (filterLongRequestData.length > 0) {
                filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                    return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
                        dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#LongFormGrid'), filterLongRequestData);
            }
            else {
                filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                    return dateObj(s1) <= dateObj(a.startDate) && dateObj(s2) >= dateObj(a.startDate) ||
                        dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#LongFormGrid'), filterLongRequestData);
            }
        }
    });

    $('.msnbc-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-conatainer-msnbc',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            msnbcStartDate = s1;
            msnbcEndDate = s2;
            if (filterMSNBCData.length > 0) {
                filterMSNBCData = $.grep(filterMSNBCData, function (a) {
                    return dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#MSNBCGrid'), filterMSNBCData);
            }
            else {
                filterMSNBCData = $.grep(finalMSNBCData, function (a) {
                    return dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#MSNBCGrid'), filterMSNBCData);
            }
        }
    });

    $('.tdy-date').dateRangePicker({
        inline: false,
        mode: 'single',
        container: '.calender-conatainer-tdy',
        alwaysOpen: false,
        singleMonth: true,
        stickyMonths: true,
        hoveringTooltip: function (days, startTime, hoveringTime) {
            //$('#shootdays').val(days);
        },
        setValue: function (s, s1, s2) {
            tdyStartDate = s1;
            tdyEndDate = s2;
            if (filterTDYData.length > 0) {
                filterTDYData = $.grep(filterTDYData, function (a) {
                    return dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#TDYGrid'), filterTDYData);
            }
            else {
                filterTDYData = $.grep(finalTDYData, function (a) {
                    return dateObj(s1) <= dateObj(a.airDate) && dateObj(s2) >= dateObj(a.airDate)
                });
                loadGrid($('#TDYGrid'), filterTDYData);
            }
        }
    });

    $('.button-archive').click(function () {
        clearFilters();
        if ($(this).text() == "Archive") {
            $(this).text("Active");
            if ($('.dashboard-tab .active').attr('id') == "das-EDR") {
                filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                    return a.daydiff >= 60;
                });

                loadGrid($('#EditRequestGrid'), filterEditRequestData);
                if (filterEditRequestData.length > 0) {
                    $('#EditRequestGrid').setGridParam({ grouping: true, rowNum: filterEditRequestData.length }).trigger('reloadGrid');
                }
            }
            else if ($('.dashboard-tab .active').attr('id') == "das-LFER") {
                filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                    return a.daydiff >= 60;
                });
                loadGrid($('#LongFormGrid'), filterLongRequestData);
                if (filterLongRequestData.length > 0) {
                    $('#LongFormGrid').setGridParam({ grouping: true, rowNum: filterLongRequestData.length }).trigger('reloadGrid');
                }
            }
            else if ($('.dashboard-tab .active').attr('id') == "das-MSNBC") {
                filterMSNBCData = $.grep(finalMSNBCData, function (a) {
                    return a.daydiff >= 60;
                });
                loadGrid($('#MSNBCGrid'), filterMSNBCData);
                if (filterMSNBCData.length > 0) {
                    $('#MSNBCGrid').setGridParam({ grouping: true, rowNum: filterMSNBCData.length }).trigger('reloadGrid');
                }
            }
            else if ($('.dashboard-tab .active').attr('id') == "das-TDY") {
                filterTDYData = $.grep(finalTDYData, function (a) {
                    return a.daydiff >= 60;
                });
                loadGrid($('#TDYGrid'), filterTDYData);
                if (filterTDYData.length > 0) {
                    $('#TDYGrid').setGridParam({ grouping: true, rowNum: filterTDYData.length }).trigger('reloadGrid');
                }
            }
        }
        else {
            $(this).text("Archive");
            if ($('.dashboard-tab .active').attr('id') == "das-EDR") {
                loadGrid($('#EditRequestGrid'), finalEditRequestData);
                $('#EditRequestGrid').setGridParam({ grouping: false, rowNum: 10 }).trigger('reloadGrid');
            }
            else if ($('.dashboard-tab .active').attr('id') == "das-LFER") {
                loadGrid($('#LongFormGrid'), finalLongRequestData);
                $('#LongFormGrid').setGridParam({ grouping: false, rowNum: 10 }).trigger('reloadGrid');
            }
            else if ($('.dashboard-tab .active').attr('id') == "das-MSNBC") {
                loadGrid($('#MSNBCGrid'), finalMSNBCData);
                $('#MSNBCGrid').setGridParam({ grouping: false, rowNum: 10 }).trigger('reloadGrid');
            }
            else if ($('.dashboard-tab .active').attr('id') == "das-TDY") {
                loadGrid($('#TDYGrid'), finalTDYData);
                $('#TDYGrid').setGridParam({ grouping: false, rowNum: 10 }).trigger('reloadGrid');
            }
        }

    })

    $('#selLocation, #selLocation-long').change(function () {
        if ($('.dashboard-tab .active').attr('id') == "das-EDR") {
            filterContraint();
        }
        else if ($('.dashboard-tab .active').attr('id') == "das-LFER") {
            filterContraintLongForm();
        }
        else {
            alert('No Action');
        }
    });

    $('#select-editoption').change(function () {
        filterContraint();
    });

    $('#select-longoption').change(function () {
        filterContraintLongForm();
    });

    $('.tab-li').click(function () {
        $('.tab-li').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').removeClass('active')
        if ($(this).attr('id') == "das-EDR") {
            $('#das-EDR-Grid').addClass('active');
            $('.edit-Cont').show();
            $('.long-Cont').hide();
        }
        else if ($(this).attr('id') == "das-LFER") {
            $('#das-LFER-Grid').addClass('active');
            $('.edit-Cont').hide();
            $('.long-Cont').show();
        }
        else if ($(this).attr('id') == "das-MSNBC") {
            $('#das-MSNBC-Grid').addClass('active');
            $('.edit-Cont').hide();
            $('.long-Cont').hide();
        }
        else if ($(this).attr('id') == "das-TDY") {
            $('#das-TDY-Grid').addClass('active');
            $('.edit-Cont').hide();
            $('.long-Cont').hide();
        }
    });

    $('.button-clear').click(function () {
        clearFilters();
        $('.button-archive').text("Archive");
        if ($('.dashboard-tab .active').attr('id') == "das-EDR") {
            loadGrid($('#EditRequestGrid'), finalEditRequestData);
            $('#EditRequestGrid').setGridParam({ grouping: false }).trigger('reloadGrid');
        }
        else if ($('.dashboard-tab .active').attr('id') == "das-LFER") {
            loadGrid($('#LongFormGrid'), finalLongRequestData);
            $('#LongFormGrid').setGridParam({ grouping: false }).trigger('reloadGrid');
        }
        else if ($('.dashboard-tab .active').attr('id') == "das-MSNBC") {
            loadGrid($('#MSNBCGrid'), finalMSNBCData);
            $('#MSNBCGrid').setGridParam({ grouping: false }).trigger('reloadGrid');
        }
        else if ($('.dashboard-tab .active').attr('id') == "das-TDY") {
            loadGrid($('#TDYGrid'), finalTDYData);
            $('#TDYGrid').setGridParam({ grouping: false }).trigger('reloadGrid');
        }
    });
});

function clearFilters() {
    if ($('.dashboard-tab .active').attr('id') == "das-EDR") {
        $('#hierarchy').text("Shows");
        $('#hierarchy-edit-location').text("Locations");
        $('#selLocation').val("");
        $('#editgrid-searchItem').val('');
        $('.edit-date').data('dateRangePicker').clear();
        $('#select-editoption').val('');
        $('#editDateView').text("View by Date");
        erStartDate = "";
        erEndDate = "";
    }
    else if ($('.dashboard-tab .active').attr('id') == "das-LFER") {
        $('#hierarchy-long').text("Shows");
        $('#hierarchy-long-location').text("Locations");
        $('#selLocation-long').val("");
        $('#longgrid-searchItem').val('');
        $('.long-date').data('dateRangePicker').clear();
        $('#select-longoption').val('');
        $('#longDateView').text("View by Date");
        lfStartDate = "";
        lfEndDate = "";
    }
    else if ($('.dashboard-tab .active').attr('id') == "das-MSNBC") {
        $('#msnbcgrid-searchItem').val('');
        $('.msnbc-date').data('dateRangePicker').clear();
        msnbcStartDate = "";
        msnbcEndDate = "";
    }
    else if ($('.dashboard-tab .active').attr('id') == "das-TDY") {
        $('#tdygrid-searchItem').val('');
        $('.tdy-date').data('dateRangePicker').clear();
         tdyStartDate = "";
        tdyEndDate = "";
    }
}

function filterContraint() {
    $('#editgrid-searchItem').val("");
    var editOption = "";
    var seletedlocation = "";
    var seletedShow = "";
    var gridTable = "";
    editOption = $('#select-editoption').val();
    gridTable = $('#EditRequestGrid');
    //seletedlocation = $('#selLocation').val();
    if ($('#hierarchy').text() != "Shows") {
        seletedShow = $('#hierarchy').text().trim();
    }
    if ($('#hierarchy-edit-location').text() != "Locations") {
        seletedlocation = $('#hierarchy-edit-location').text().trim();
    }
    filterEditRequestData = [];
    if (!!seletedlocation && !!seletedShow && !!editOption) {
        if (editOption == "Craft Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes" && a.Show.indexOf(seletedShow) != -1 && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        else if (editOption == "Producer Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes" && a.Show.indexOf(seletedShow) != -1 && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        if (!!erStartDate && !!erEndDate) {
            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                    dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
            });
            //loadGrid(gridTable, filterEditRequestData);
        }
        loadGrid(gridTable, filterEditRequestData);
    }
    else if (!!seletedlocation && !!seletedShow) {
        filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            return a.Show.indexOf(seletedShow) != -1 && a.LocationofEdit.indexOf(seletedlocation) != -1;
        });
        //loadGrid(gridTable, filterEditRequestData);
        if (!!erStartDate && !!erEndDate) {
            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                    dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
            });
            //loadGrid(gridTable, filterEditRequestData);
        }
        loadGrid(gridTable, filterEditRequestData);
    }
    else if (!!seletedShow && !!editOption) {
        if (editOption == "Craft Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes" && a.Show.indexOf(seletedShow) != -1;
            });
        }
        else if (editOption == "Producer Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes" && a.Show.indexOf(seletedShow) != -1;
            });
        }
        //loadGrid(gridTable, filterEditRequestData);
        if (!!erStartDate && !!erEndDate) {
            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                    dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
            });
            //loadGrid(gridTable, filterEditRequestData);
        }
        loadGrid(gridTable, filterEditRequestData);
    }
    else if (!!seletedlocation && !!editOption) {
        if (editOption == "Craft Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes" && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        else if (editOption == "Producer Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes" && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        //loadGrid(gridTable, filterEditRequestData);
        if (!!erStartDate && !!erEndDate) {
            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                    dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
            });
            //loadGrid(gridTable, filterEditRequestData);
        }
        loadGrid(gridTable, filterEditRequestData);
    }
    else if (!!seletedlocation) {
        filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            return a.LocationofEdit.indexOf(seletedlocation) != -1;
        });
        //loadGrid(gridTable, filterEditRequestData);
        if (!!erStartDate && !!erEndDate) {
            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                    dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
            });
            // loadGrid(gridTable, filterEditRequestData);
        }
        loadGrid(gridTable, filterEditRequestData);
    }
    else if (!!seletedShow) {
        filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            return a.Show.indexOf(seletedShow) != -1;
        });
        //loadGrid(gridTable, filterEditRequestData);
        if (!!erStartDate && !!erEndDate) {
            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                    dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
            });
            //loadGrid(gridTable, filterEditRequestData);
        }
        loadGrid(gridTable, filterEditRequestData);
    }
    else if (!!editOption) {
        if (editOption == "Craft Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes";
            });
        }
        else if (editOption == "Producer Edit") {
            filterEditRequestData = $.grep(finalEditRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes";
            });
        }
        //loadGrid(gridTable, filterEditRequestData);
        if (!!erStartDate && !!erEndDate) {
            filterEditRequestData = $.grep(filterEditRequestData, function (a) {
                return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                    dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
            });
            //loadGrid(gridTable, filterEditRequestData);
        }
        loadGrid(gridTable, filterEditRequestData);
    }
    else if (!!erStartDate && !!erEndDate) {
        filterEditRequestData = $.grep(finalEditRequestData, function (a) {
            return dateObj(erStartDate) <= dateObj(a.startDate) && dateObj(erEndDate) >= dateObj(a.startDate) ||
                dateObj(erStartDate) <= dateObj(a.airDate) && dateObj(erEndDate) >= dateObj(a.airDate)
        });
        loadGrid(gridTable, filterEditRequestData);
    }
    else {
        filterEditRequestData = [];
        loadGrid(gridTable, finalEditRequestData);
    }
}

function filterContraintLongForm() {
    $('#longgrid-searchItem').val();
    var editOption = "";
    var seletedlocation = "";
    var seletedShow = "";
    var gridTable = "";
    editOption = $('#select-longoption').val();
    gridTable = $('#LongFormGrid');
    //seletedlocation = $('#selLocation-long').val();
    if ($('#hierarchy-long').text() != "Shows") {
        seletedShow = $('#hierarchy-long').text().trim();
    }
    if ($('#hierarchy-long-location').text() != "Locations") {
        seletedlocation = $('#hierarchy-long-location').text().trim();
    }
    filterLongRequestData = [];
    if (!!seletedlocation && !!seletedShow && !!editOption) {
        if (editOption == "Craft Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes" && a.Show.indexOf(seletedShow) != -1 && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        else if (editOption == "Producer Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes" && a.Show.indexOf(seletedShow) != -1 && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        else if (editOption == "Assistant Editor Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsAssistantProducerEditRequired == "Yes" && a.Show.indexOf(seletedShow) != -1 && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        if (!!lfStartDate && !!lfEndDate) {
            filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                    dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
            });
        }
        loadGrid(gridTable, filterLongRequestData);
    }
    else if (!!seletedlocation && !!seletedShow) {
        filterLongRequestData = $.grep(finalLongRequestData, function (a) {
            return a.Show.indexOf(seletedShow) != -1 && a.LocationofEdit.indexOf(seletedlocation) != -1;
        });
        if (!!lfStartDate && !!lfEndDate) {
            filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                    dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
            });
        }
        loadGrid(gridTable, filterLongRequestData);
    }
    else if (!!seletedShow && !!editOption) {
        if (editOption == "Craft Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes" && a.Show.indexOf(seletedShow) != -1;
            });
        }
        else if (editOption == "Producer Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes" && a.Show.indexOf(seletedShow) != -1;
            });
        }
        else if (editOption == "Assistant Editor Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsAssistantProducerEditRequired == "Yes" && a.Show.indexOf(seletedShow) != -1;
            });
        }
        if (!!lfStartDate && !!lfEndDate) {
            filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                    dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
            });
        }
        loadGrid(gridTable, filterLongRequestData);
    }
    else if (!!seletedlocation && !!editOption) {
        if (editOption == "Craft Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes" && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        else if (editOption == "Producer Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes" && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        else if (editOption == "Assistant Editor Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsAssistantProducerEditRequired == "Yes" && a.LocationofEdit.indexOf(seletedlocation) != -1;
            });
        }
        if (!!lfStartDate && !!lfEndDate) {
            filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                    dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
            });
        }
        loadGrid(gridTable, filterLongRequestData);
    }
    else if (!!seletedlocation) {
        filterLongRequestData = $.grep(finalLongRequestData, function (a) {
            return a.LocationofEdit.indexOf(seletedlocation) != -1;
        });
        if (!!lfStartDate && !!lfEndDate) {
            filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                    dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
            });
        }
        loadGrid(gridTable, filterLongRequestData);
    }
    else if (!!seletedShow) {
        filterLongRequestData = $.grep(finalLongRequestData, function (a) {
            return a.Show.indexOf(seletedShow) != -1;
        });
        if (!!lfStartDate && !!lfEndDate) {
            filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                    dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
            });
        }
        loadGrid(gridTable, filterLongRequestData);
    }
    else if (!!editOption) {
        if (editOption == "Craft Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsCraftEditorNeeded == "Yes";
            });
        }
        else if (editOption == "Producer Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsProducerEditCompleted == "Yes";
            });
        }
        else if (editOption == "Assistant Editor Edit") {
            filterLongRequestData = $.grep(finalLongRequestData, function (a) {
                return a.IsAssistantProducerEditRequired == "Yes";
            });
        }
        if (!!lfStartDate && !!lfEndDate) {
            filterLongRequestData = $.grep(filterLongRequestData, function (a) {
                return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                    dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
            });
        }
        loadGrid(gridTable, filterLongRequestData);
    }
    else if (!!lfStartDate && !!lfEndDate) {
        filterLongRequestData = $.grep(finalLongRequestData, function (a) {
            return dateObj(lfStartDate) <= dateObj(a.startDate) && dateObj(lfEndDate) >= dateObj(a.startDate) ||
                dateObj(lfStartDate) <= dateObj(a.airDate) && dateObj(lfEndDate) >= dateObj(a.airDate)
        });
        loadGrid(gridTable, filterLongRequestData);
    }
    else {
        filterLongRequestData = [];
        loadGrid(gridTable, finalLongRequestData);
    }
}

function loadGrid(gridElement, data) {
    gridElement.jqGrid('clearGridData').jqGrid('setGridParam', { data: data }).trigger('reloadGrid');
    if (gridElement.attr('id') == "EditRequestGrid") {
        var editNew = $.grep(data, function (a) {
            return a.EditStatus == "New";
        });
        $('#ERQ-Value').text("(" + editNew.length + ")");

    }
    else if (gridElement.attr('id') == "LongFormGrid") {
        var longNew = $.grep(data, function (a) {
            return a.EditStatus == "New";
        });
        $('#long-Value').text("(" + longNew.length + ")");
    }
}

function getUrlVars() {
    var vars = [], hash;
    try {
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;

    } catch (e) {
        console.log(e.message);
    }
}

function ReadList(url, listName, query) {
    var serverurl = "/sites/bcast_prodreq";
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
function peoplePickerClear(value) {
    var controlVal = "";
    if (!!value) {
        controlVal = value.split('(')[0];
    }
    return controlVal;
}