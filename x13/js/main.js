

$(document).ready(function()
{
    jQuery("#dialog").dialog({
        dialogClass: 'ui-dialog',
        width: 400,
        resizable: false,
        autoOpen: false
    });

    jQuery("#dialogComp").dialog({
        dialogClass: 'ui-dialog',
        width: 400,
        resizable: false,
        autoOpen: false
    });

});

function openDialog() {
    jQuery("#dialog").dialog("open");
}

function openDialogComp() {
    jQuery("#dialogComp").dialog("open");
}

function closeDialog() {
    jQuery("#dialog").dialog("close");
}
