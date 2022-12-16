const erpnext_onload = frappe.listview_settings["Sales Invoice"].onload;
frappe.listview_settings["Sales Invoice"].onload = function (list_view) {
    if (erpnext_onload) {
        erpnext_onload(list_view);
    }
    list_view.page.add_action_item(__("GST Invoice"), function (event) {
        let selected = [];

        for (let check of event.view.cur_list.$checks) {
            selected.push(check.dataset.name);
        }
        frappe.call({
            method: "india_compliance.cleartax_integration.API.gst.bulk_purchase_gst",
            args: {
                data: selected
            },
            type: "POST",
            callback: function(r) {
                frappe.msgprint("GST Invoices are scheduled to be genereated!")
                list_view.refresh();
                }
            })

    });

}