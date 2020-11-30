$(function () {
    var treeListData = $.map(tasks, function (task, _) {
        task.Task_Assigned_Employee = null;
        // $.each(employees, function (_, employee) {
        //     if (employee.ID == task.Task_Assigned_Employee_ID)
        //         task.Task_Assigned_Employee = employee;
        // });
        return task;
    });

    $("#tasks").dxTreeList({
        dataSource: treeListData,
        keyExpr: "Task_ID",
        parentIdExpr: "Task_Parent_ID",
        columnAutoWidth: true,
        wordWrapEnabled: true,
        showBorders: true,
        expandedRowKeys: [1, 2],
        selectedRowKeys: [1, 29, 42],
        searchPanel: {
            visible: true,
            width: 250
        },
        headerFilter: {
            visible: true
        },
        // selection: {
        //     mode: "multiple"
        // },
        columnChooser: {
            enabled: true
        },
        allowColumnReordering: true,
        columns: [
            {
                dataField: "Task_Name",
                caption: 'Сведения',
                allowSorting: false,
                minWidth: 300,
                cellTemplate: function (container, options) {
                    var $wrapper = $("<div>", {"class": "commonfile commonfile_status__" + options.data.Task_Status + " commonfile_type__" + options.data.Task_Type});
                    $wrapper.append("<div class='commonfile_type'>" + getFileTypeName(options.data.Task_Type) + "</div>");
                    $wrapper.append("<div class='commonfile_name'>" + options.data.Task_Name + "</div>");


                    if(options.data.Task_FileName){
                        var $props_file = $("<div>", {"class": "props"});
                        $props_file.append("<div class='prop'><div class='key'>Прикрепленные файлы:</div><div class='value'><a target='_blank' href='" + options.data.Task_FilePath + "'>" + options.data.Task_FileName + "</a></div></div>");
                        $wrapper.append($props_file);
                    }



                    var $props = $("<div>", {"class": "props"});

                    if(options.data.Task_Control){
                        $props.append("<div class='prop'><div class='key'>Статус:</div><div class='value'>На контроле</div></div>");
                    }
                    $props.append("<div class='prop'><div class='key'>Документ:</div><div class='value'>№" + options.data.Task_Num + " от " + options.data.Task_Date + "</div></div>");
                    $props.append("<div class='prop'><div class='key'>Срок исполнения:</div><div class='value'>" + options.data.Task_TimePerfomance + "</div></div>");
                    $props.append("<div class='prop'><div class='key'>Дата исполнения:</div><div class='value'>" + options.data.Task_DatePerfomance + "</div></div>");

                    $wrapper.append($props);

                    container.append($wrapper);
                }
            },
            {
                dataField: "Task_TimePerfomance",
                caption: "Дата исполнения"
            },
            {
                dataField: "Task_DatePerfomance",
                caption: "Срок исполнения",
            },
            {
                dataField: "dataField",
                caption: "Файл",
                cellTemplate: function (container, options) {
                    container.append($("<a>", {
                        "class": "file",
                        "target": "_blank",
                        text: options.data.Task_FileName,
                        href: options.data.Task_FilePath
                    }))
                }
            }, {
                type: "buttons",
                buttons: [{
                    template: function () {
                        var div = $("<div>", {});
                        var link = $("<a>").text("Закрыть")
                            .attr("href", "#");
                        // link.on("click", function() {
                        //     console.log("My command was clicked");
                        // });
                        div.append(link);
                        return div;
                    }
                }, {
                    template: function () {
                        var div = $("<div>", {});
                        var link = $("<a>").text("Перенести срок")
                            .attr("href", "#");

                        div.append(link);
                        return div;
                    }
                }, {
                    template: function () {
                        var div = $("<div>", {});
                        var link = $("<a>").text("Отменить исполенение")
                            .attr("href", "#");
                        div.append(link);
                        return div;
                    }
                }]
            }
        ]
    });
});

function getFileTypeName(type) {
    switch (type) {
        case 'protocol':
            return "Протокол";
        case 'vipiska':
            return "Выписка";
        default:
            return type;
    }

}

//http://asoft21.ru/img/icons/icon_flag_black.svg
var tasks = [{
    "Task_ID": 1,
    "Task_Type": "protocol",
    "Task_Num": 112,
    "Task_Date": '30.09.2020',
    "Task_Name": "по результатам совещания по реализуемым в 2020 году проектам",
    "Task_TimePerfomance": "-",
    "Task_DatePerfomance": "-",
    "Task_FileName": "30.09-112(66).doc",
    "Task_FilePath": "https://old.gcheb.delo.cap.ru/edit/01CD_files/file.asp?id={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&link={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&preurl=in_doc&FKey=doc_id",
    "Task_Status": "none",
    "Task_Control": false,
    "Task_Parent_ID": 0
},
    {
        "Task_ID": 2,
        "Task_Type": "vipiska",
        "Task_Num": 1.1,
        "Task_Date": '30.09.2020',
        "Task_Name": "Инвестиционный проект «Туристский кластер «Чувашия – сердце Волги» (Ростуризм). 1.1. Белову О.Г.: - Ввести в эксплуатацию объект реконструкции Московской набережной у Свято-Троицкого монастыря. Срок: до 01.12.2020 ",
        "Task_TimePerfomance": "01.12.2020",
        "Task_DatePerfomance": "-",
        "Task_FileName": "",
        "Task_FilePath": "",
        "Task_Status": "yellow",
        "Task_Control": true,
        "Task_Parent_ID": 1
    },
    {
        "Task_ID": 3,
        "Task_Type": "protocol",
        "Task_Num": 112,
        "Task_Date": '30.09.2020',
        "Task_Name": "по результатам совещания по реализуемым в 2020 году проектам",
        "Task_TimePerfomance": "-",
        "Task_DatePerfomance": "-",
        "Task_FileName": "30.09-112(66).doc",
        "Task_FilePath": "https://old.gcheb.delo.cap.ru/edit/01CD_files/file.asp?id={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&link={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&preurl=in_doc&FKey=doc_id",
        "Task_Status": "green",
        "Task_Parent_ID": 0
    },
    {
        "Task_ID": 4,
        "Task_Type": "vipiska",
        "Task_Num": 113,
        "Task_Date": '30.09.2020',
        "Task_Name": "по результатам совещания по реализуемым в 2020 году проектам",
        "Task_TimePerfomance": "01.12.2020",
        "Task_DatePerfomance": "-",
        "Task_FileName": "30.09-112(66).doc",
        "Task_FilePath": "https://old.gcheb.delo.cap.ru/edit/01CD_files/file.asp?id={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&link={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&preurl=in_doc&FKey=doc_id",
        "Task_Status": "yellow",
        "Task_Parent_ID": 3
    },
];


var priorities = [
    {id: 1, value: "Low"},
    {id: 2, value: "Normal"},
    {id: 3, value: "Urgent"},
    {id: 4, value: "High"}
];