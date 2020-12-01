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
        showRowLines: true,
        columnFixing: {
            enabled: true
        },
        expandedRowKeys: [1, 2],
        selectedRowKeys: [1, 29, 42],
        searchPanel: {
            visible: true,
            width: 250
        },
        headerFilter: {
            visible: true
        },
        selection: {
            mode: "multiple"
        },
        columnChooser: {
            enabled: true
        },
        sorting: {
            mode: "multiple"
        },
        allowColumnReordering: true,
        columns: [
            {
                dataField: "Task_Name",
                caption: 'Сведения',
                allowSorting: false,
                allowFiltering: false,
                headerCellTemplate: function (header, info) {
                    var $buttons_area = $('<div>', {class: "buttons_area"});
                    $buttons_area.append("<a>Закрыть</a>");
                    $buttons_area.append("<a>Перенести срок</a>");
                    $buttons_area.append("<a>Отменить исполнение</a>");
                    header.append($buttons_area);
                },
                // width: 900,
                // minWidth:900,
                // maxWidth:900,
                cellTemplate: function (container, options) {
                    var $wrapper = $("<div>", {"class": "commonfile commonfile_status__" + options.data.Task_Execution + " commonfile_type__" + options.data.Task_TypeName});
                    $wrapper.append("<div class='commonfile_type'>" + options.data.Task_TypeName + " №" + options.data.Task_Num + "&nbsp;&nbsp;&nbsp;    <span class='low-text'>от</span> " + options.data.Task_Date + "</div>");
                    $wrapper.append("<div class='commonfile_name'>" + options.data.Task_Name + "</div>");

                    //файл
                    if (options.data.Task_FileName) {
                        var $props_file = $("<div>", {"class": "props"});
                        $props_file.append("<div class='attach_file'><div class='key'>Прикрепленные файлы:</div><div class='value'><a target='_blank' href='" + options.data.Task_FilePath + "'>" + options.data.Task_FileName + "</a></div></div>");
                        $wrapper.append($props_file);
                    }
                    //овет
                    if (options.data.Task_Answer) {
                        var $props_answer = $("<div>", {"class": "props"});
                        $props_answer.append("<div class='props_answer'><div class='key'>Ответ: </div><div class='value'>" + options.data.Task_Answer + "</div></div>");
                        $wrapper.append($props_answer);
                    }
                    //от коко и кому
                    if (options.data.Task_From || options.data.Task_To) {
                        var $props_fromto = $("<div>", {"class": "props"});
                        $props_fromto.append(`<div class='props_fromto'><span>${options.data.Task_From}</span><span class="arrow_fromto"></span><span>${options.data.Task_To}</span></div>`);
                        $wrapper.append($props_fromto);
                    }

                    var $props = $("<div>", {"class": "props"});


                    if (options.data.Task_Control!="none"){
                        if (options.data.Task_Control=="на контроле") {
                            $props.append("<div class='prop'><div class='doc_control'>K</div></div>");
                        }
                        else if(options.data.Task_Control=="снят с контроля"){
                            $props.append("<div class='prop'><div class='doc_control doc_control__removed'>K</div></div>");
                        }
                    }



                    $props.append("<div class='prop'><div class='key'>Срок исполнения:</div><div class='value'>" + options.data.Task_TimePerfomance + "</div></div>");
                    $props.append("<div class='prop'><div class='key'>Дата исполнения:</div><div class='value'>" + options.data.Task_DatePerfomance + "</div></div>");

                    $wrapper.append($props);

                    container.append($wrapper);
                }
            }, {
                dataField: "Task_Type",
                caption: 'Тип документа',
                showInColumnChooser: true,
                visible: false
            }, {
                dataField: "Task_Name",
                caption: 'Наименование документа',
                visible: false
            }, {
                dataField: "Task_Num",
                caption: 'Номер документа',
                showInColumnChooser: true,
                visible: false
            }, {
                dataField: "Task_Date",
                caption: 'Дата документа',
                visible: false
            }, {
                dataField: "Task_Year",
                caption: 'Год регистрации',
                visible: false
            }, {
                dataField: "Task_Control",
                caption: 'Контроль',
                visible: false
            }, {
                dataField: "Task_DatePerfomance",
                caption: "Срок исполнения",
                visible: false
            }, {
                dataField: "Task_TimePerfomance",
                caption: "Дата исполнения",
                visible: false
            }, {
                dataField: "Task_Status",
                caption: "Статус",
                visible: false
            }, {
                dataField: "dataField",
                caption: "Файл",
                visible: false,
                cellTemplate: function (container, options) {
                    container.append($("<a>", {
                        "class": "file",
                        "target": "_blank",
                        text: options.data.Task_FileName,
                        href: options.data.Task_FilePath
                    }))
                }
            },
            {
                type: "buttons",
                minWidth: 180,
                buttons: [
                    // {
                    //     template: function () {
                    //         var div = $("<div>", {});
                    //         var link = $("<a>").text("Закрыть").attr("href", "#");
                    //
                    //         div.append(link);
                    //         return div;
                    //     }
                    // },
                    {
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

function TaskStatusName(status) {
    switch (status) {
        case 'red':
            return 'Срок исполнения сегодня или истек';
        case 'yellow':
            return 'До срока исполнения менее 3 дней';
        case 'green':
            return 'До срока исполнения более двух дней';
    }
}


//. на исполнении, на резолюции
var tasks = [{
    "Task_ID": 1,
    "Task_TypeName": "Протокол",
    "Task_Type": "protocol",
    "Task_Num": 112,
    "Task_Date": '30.09.2020',
    "Task_Year": "2020",
    "Task_Name": "по результатам совещания по реализуемым в 2020 году проектам",
    "Task_TimePerfomance": "-",
    "Task_DatePerfomance": "-",
    "Task_FileName": "30.09-112(66).doc",
    "Task_FilePath": "https://old.gcheb.delo.cap.ru/edit/01CD_files/file.asp?id={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&link={C3F2E44E-7823-44AE-9486-31FCFE5C1409}&preurl=in_doc&FKey=doc_id",
    "Task_Execution": "none",
    "Task_Status": "новый",
    "Task_Control": "none",
    "Task_Parent_ID": 0
},
    {
        "Task_ID": 2,
        "Task_TypeName": "Выписка",
        "Task_Type": "Выписка",
        "Task_Num": 1.1,
        "Task_Date": '30.09.2020',
        "Task_Year": "2020",
        "Task_Name": "Инвестиционный проект «Туристский кластер «Чувашия – сердце Волги» (Ростуризм). 1.1. Белову О.Г.: - Ввести в эксплуатацию объект реконструкции Московской набережной у Свято-Троицкого монастыря. Срок: до 01.12.2020 ",
        "Task_TimePerfomance": "01.12.2020",
        "Task_DatePerfomance": "-",
        "Task_FileName": "",
        "Task_FilePath": "",
        "Task_Execution": "yellow",
        "Task_Status": "новый",
        "Task_Control": "снят с контроля",
        "Task_Parent_ID": 1
    },
    {
        "Task_ID": 3,
        "Task_TypeName": "Поручение на документ № 1.1.",
        "Task_Type": "Поручение",
        "Task_Num": 112,
        "Task_Answer": "Документ № 2.1. от 30.09.2020",
        "Task_From": "Администрация г.Чебоксары",
        "Task_To": "МБУ ЖКХиБ от 30.09.2020 ",
        "Task_Date": '30.09.2020',
        "Task_Year": "2020",
        "Task_Name": "Поручение. Протокол № 112 от 30.09.2020 пункт 1.1. I. Инвестиционный проект «Туристский кластер «Чувашия – сердце Волги» (Ростуризм). 1.1. Белову О.Г.: - Ввести в эксплуатацию объект реконструкции Московской набережной у Свято-Троицкого монастыря. Срок: до 01.12.2020 ",
        "Task_TimePerfomance": "01.12.2020",
        "Task_DatePerfomance": "-",
        "Task_FileName": "",
        "Task_FilePath": "",
        "Task_Execution": "yellow",
        "Task_Status": "новый",
        "Task_Control": "на контроле",
        "Task_Parent_ID": 2
    },
    {
        "Task_ID": 4,
        "Task_TypeName": "Выписка",
        "Task_Type": "Выписка",
        "Task_Num": 1.2,
        "Task_Date": '30.09.2020',
        "Task_Year": "2020",
        "Task_Name": "Инвестиционный проект «Туристский кластер «Чувашия – сердце Волги» (Ростуризм). 1.1. Белову О.Г.: - Ввести в эксплуатацию объект реконструкции Московской набережной у Свято-Троицкого монастыря. Срок: до 01.12.2020 ",
        "Task_TimePerfomance": "30.10.2020",
        "Task_DatePerfomance": "29.10.2020",
        "Task_FileName": "",
        "Task_FilePath": "",
        "Task_Execution": "green",
        "Task_Status": "новый",
        "Task_Control": "на контроле",
        "Task_Parent_ID": 1
    },
    {
        "Task_ID": 5,
        "Task_TypeName": "Поручение на документ № 1.2. от 30.09.2020",
        "Task_Type": "Поручение",
        "Task_Num": 1.2,
        "Task_Date": '30.09.2020',
        "Task_Year": "2020",
        "Task_Name": "Поручение. Протокол № 112 от 30.09.2020 пункт 1.2. I. Инвестиционный проект «Туристский кластер «Чувашия – сердце Волги» (Ростуризм). 1.2. Яковлеву В.Г., Кучерявому И.Л.: - Совместно с Минэкономразвития Чувашии подать заявку по финансированию строительства паркинга (Мегаполис-отель). Срок: до 01.11.2020 ",
        "Task_TimePerfomance": "30.10.2020",
        "Task_DatePerfomance": "29.10.2020",
        "Task_FileName": "",
        "Task_FilePath": "",
        "Task_Execution": "green",
        "Task_Status": "новый",
        "Task_Control": "на контроле",
        "Task_Parent_ID": 4
    },

];