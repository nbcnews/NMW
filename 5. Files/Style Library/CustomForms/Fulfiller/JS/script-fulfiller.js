$(function () {

    //initializePeoplePicker('ff_peoplePickerResourceDiv_0', false);
    //initializePeoplePicker('ff_peoplePickerRequesterDiv', false);
    //initializePeoplePicker('ff_peoplePickerProducerDiv', false);
    //initializePeoplePicker('ff_peoplePickerApproverDiv', false);

    //$(document).on("click", ".button-edit", function () {
    //    if ($(this).text() == "edit") {
    //        $(this).text("save");
    //        $(this).parent().parent().find('.display-data').hide();
    //        $(this).parent().parent().find('.textbox').show();
    //    }
    //    else {
    //        $(this).text("edit");
    //        $(this).parent().parent().find('.display-data').each(function (ind, val) {
    //            $(this).show()
    //            $(this).text($(this).prev().val());
    //            $(this).prev().hide();
    //        });
    //    }
    //});

    //$('.button-edit-rs').click(function () {
    //    if ($(this).text() == "edit") {
    //        $(this).text("save");
    //        $(this).parent().parent().find('.display-data').hide();
    //        $(this).parent().parent().find('.textbox').show();
    //    }
    //    else {
    //        $(this).text("edit");
    //        $(this).parent().parent().find('.display-data').each(function (ind, val) {
    //            $(this).show()
    //            $(this).text($(this).prev().val());
    //            $(this).prev().hide();
    //        });
    //    }
    //});

    //$('.button-add').click(function () {

    //    var btn_click_cntl =
    //                        '<div class="row row-dynamic">' +
    //                            '<div class="cols cols-4-5 form-group">' +
    //                                '<label class="label label-display label-producer">' +
    //                                    'Producer/ <sup class="mandatory">*</sup><br>' +
    //                                    'Field Contact' +
    //                                '</label>' +
    //                                '<div class="display-dataform">' +
    //                                    '<input type="text" class="selectbox ProducerField">' +
    //                                    ' <span class="icon-search"></span>' +
    //                                '</div>' +
    //                            '</div>' +
    //                            '<div class="cols cols-3-5 form-group">' +
    //                                '<label class="label label-display">Desk Phone <sup class="mandatory">*</sup></label>' +
    //                                '<div class="display-dataform"> <input type="text" class="textbox" value="+1 (555) 555-5555"><span class="display-data">+1 (555) 555-5555</span></div>' +
    //                            '</div>' +
    //                            '<div class="cols cols-3-5 form-group">' +
    //                                '<label class="label label-display">Cell Phone <sup class="mandatory">*</sup></label>' +
    //                                '<div class="display-dataform"> <input type="text" class="textbox" value="+1 (555) 555-5555"><span class="display-data">+1 (555) 555-5555</span></div>' +
    //                            '</div>' +
    //                            '<div class="cols cols-1 form-edit-button"> <span class="button-edit">edit</span> <span class="button-remove">remove</span> </div>' +

    //                    '</div>';

    //    $(this).parent().before(btn_click_cntl);

    //});

    //$('.button-add-app').click(function () {
    //    //$('.label-addres').css("visibility", "visible")
    //    //$('.display-pf1').hide();
    //    //$('.display-pf2').show();
    //    //$(this).parent().parent().addClass('active');
    //    //var resultSet = '<section class="crew-info-container">' +
    //    //  '<div class="row">' +
    //    //    '<div class="cols cols-4 form-group">' +
    //    //      '<label class="label label-display label-producer">Resource</label>' +
    //    //      '<div class="display-data1">' +
    //    //        '<div id="' + $('.crew-info-container').length + '_ff_peoplePickerResourceDiv"></div>' +
    //    //        '</div>' +
    //    //    '</div>' +
    //    //    '<div class="cols cols-4 form-group">' +
    //    //      '<label class="label label-display label-producer">Phone #</label>' +
    //    //      '<div class="display-data1">' +
    //    //        '<input type="text" class="selectbox ProducerField">' +
    //    //      '</div>' +
    //    //    '</div>' +
    //    //    '<div class="cols cols-4 form-group">' +
    //    //      '<label class="label label-display label-producer">Email</label>' +
    //    //      '<div class="display-data1">' +
    //    //        '<input type="text" class="selectbox ProducerField">' +
    //    //      '</div>' +
    //    //    '</div>' +
    //    //  '</div>' +
    //    //  '<div class="row">' +
    //    //    '<div class="cols cols-4 form-group">' +
    //    //      '<label class="label label-display label-producer label-addres" style="visibility:hidden"> Additional<br>' +
    //    //        'Users <span class="icon-info">i</span></label>' +
    //    //      '<div class="display-dataform display-dataform-mobile display-pf2" style="display:none">' +
    //    //        '<input type="text" class="selectbox ProducerField">' +
    //    //        '<span class="icon-search"></span> <span class="remove-button button-remove-sp"></span> </div>' +
    //    //    '</div>' +
    //    //    '<div class="cols cols-4 form-group">' +
    //    //      '<label class="label label-display label-producer">Role</label>' +
    //    //      '<div class="display-data1">' +
    //    //        '<input type="text" class="selectbox ProducerField">' +
    //    //      '</div>' +
    //    //    '</div>' +
    //    //    '<div class="cols cols-4 form-group">' +
    //    //      '<label class="label label-display label-producer">Employee Type</label>' +
    //    //      '<div class="display-data1 Employee-Type">' +
    //    //        '<input type="text" class="selectbox ProducerField">' +
    //    //      '</div>' +
    //    //'</div>' +
    //    //'</div>' +
	//	//'<div class="row">'+
	//	//'<div class="cols cols-4 form-group button-remove-container">'+
	//	//'<label class="label label-display label-producer" style="visibility:hidden">Resource</label>' +
    //    //'<div class="display-data1 ">' +
    //    //'<span class="button-remove-app">remove</span>' +
    //    // '</div>' +
	//	// '</div>' +
	//	// '</div>' +
    //    //'</section>';
    //    ////$('.button-add-app').closest('.row').after(resultSet);
    //    //$(this).parent().parent().parent().prev().after(resultSet);
    //    //var itemCount = parseInt($('.crew-info-container').length) - 1;
    //    //initializePeoplePicker(itemCount + "_ff_peoplePickerResourceDiv", false);
    //});

    //$(document).on("click", ".button-remove-app", function () {
    //    $(this).closest('.crew-info-container').remove();
    //});

    //$('.display-fullwidth .button').click(function () {
    //    $('.display-fullwidth .button').removeClass('active');
    //    $(this).addClass('active');
    //})

    //$('.button-addt').click(function () {
    //    var btn_click_cntl = '<div class="form-group form-group-talent">' +
    //                  '<label class="label">Talent (On Site) <sup class="mandatory">*</sup></label>' +
    //                  '<div class="field-input">' +
    //                      '<input type="text" class="selectbox-full" value="type ahead">' +
    //                  '</div>' +
    //                  '<div class="form-group form-group-button"> <span class="button-remove-talent">remove</span> </div>' +
    //              '</div>';
    //    //'<div class="form-group form-group-button"> <span class="button-remove">remove</span> </div>' +

    //    $(this).before(btn_click_cntl);
    //});

    //$(document).on("click", ".button-remove-talent", function () {
    //    $(this).closest('.form-group-talent').remove();
    //});

    //$(document).on("click", ".button-remove-sp", function () {
    //    //$(this).closest('.row').remove();
    //    //$('.button-add-app').show();
    //    $('.label-addres').css("visibility", "hidden")
    //    $('.display-pf1').show();
    //    $('.display-pf2').hide();
    //});

    //$('.button-addsu').click(function () {
    //    var btn_click_cntl = '<div class="form-group form-group-showunit">' +
    //                                    '<label class="label">Show Unit <sup class="mandatory">*</sup></label>' +
    //                                    '<div class="field-input">' +
    //                                        '<select class="selectbox-full">' +
    //                                            '<option>type ahead</option>' +
    //                                        '</select>' +
    //                                    '</div>' +
    //                                    '<div class="form-group form-group-button"> <span class="button-remove-showunit">remove</span> </div>' +
    //                                '</div>';
    //    //'<div class="form-group form-group-button"> <span class="button-remove">remove</span> </div>' +

    //    $(this).before(btn_click_cntl);
    //});

    //$(document).on("click", ".button-remove-showunit", function () {
    //    $(this).closest('.form-group-showunit').remove();
    //});
    //$(document).on("click", ".button-remove", function () {
    //    $(this).closest('.row-dynamic').remove();
    //});

    //$('.ProducerasRequestor').change(function () {
    //    if ($(this).is(':checked')) {
    //        $('.ProducerField').val($.trim($('.display-data1').text()));
    //    }
    //    else {
    //        $('.ProducerField').val("");
    //    }
    //});

    //$('#saveRevise').click(function () {
    //    $('.button-booked').removeClass('active-NEW').removeClass('active-ROFR').removeClass('active-EFFORTING').removeClass('active-REVISED').removeClass('active-BOOKED').removeClass('active-CANCELLED');
    //    var textval = "active-" + $('.button.active').text();
    //    $('.button-booked').text($('.button.active').text());
    //    $('.button-booked').addClass(textval);
    //});
});
//function getUrlVars() {
//    var vars = [], hash;
//    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//    for (var i = 0; i < hashes.length; i++) {
//        hash = hashes[i].split('=');
//        vars.push(hash[0]);
//        vars[hash[0]] = hash[1];
//    }
//    return vars;
//}

//function initializePeoplePicker(peoplePickerElementId, AllowMultipleValues) {

//    // Create a schema to store picker properties, and set the properties.
//    var schema = {};
//    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
//    schema['SearchPrincipalSource'] = 15;
//    schema['ResolvePrincipalSource'] = 15;
//    schema['AllowMultipleValues'] = AllowMultipleValues;
//    schema['MaximumEntitySuggestions'] = 50;
//    schema['Width'] = '280px';

//    // Render and initialize the picker.
//    // Pass the ID of the DOM element that contains the picker, an array of initial
//    // PickerEntity objects to set the picker value, and a schema that defines
//    // picker properties.
//    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
//}