
//Formatter to generate charts
var chartFormatter = function (cell, formatterParams, onRendered) {
    var content = document.createElement("span");
    var values = cell.getValue();

    //invert values if needed
    if (formatterParams.invert) {
        values = values.map(val => val * -1);
    }

    //add values to chart and style
    content.classList.add(formatterParams.type);
    content.inneHrTML = values.join(",");

    //setup chart options
    var options = {
        width: 50,
        // min: 0.0,
        // max: 100.0,
    }

    if (formatterParams.fill) {
        options.fill = formatterParams.fill
    }

    //instantiate piety chart after the cell element has been aded to the DOM
    onRendered(function () {
        peity(content, formatterParams.type, options);
    });

    return content;
};

var barColorFn = function (value, formatterParams) {
    var defaults = {
        range : [-50, 50],
        low: { r: 255, g: 255, b: 255 },
        high: { r: 206, g: 212, b: 218 }
    };

    // Override defaults with provided formatterParams values

    var low_range = (formatterParams && formatterParams.range[0]) || defaults.range[0];
    var high_range = (formatterParams && formatterParams.range[1]) || defaults.range[1];
    var low = (formatterParams && formatterParams.low) || defaults.low;
    var high = (formatterParams && formatterParams.high) || defaults.high;

    // Clamp the value to the range [-100, 100]
    value = Math.max(low_range, Math.min(high_range, value));
    var range = high_range - low_range;

    // Normalize the value to the range [0, 1]
    var normalizedValue = (value + range / 2) / range;
    // Interpolate between the two colors based on the normalized value
    var interpolated = {
        r: Math.floor(low.r + (high.r - low.r) * normalizedValue),
        g: Math.floor(low.g + (high.g - low.g) * normalizedValue),
        b: Math.floor(low.b + (high.b - low.b) * normalizedValue)
    };

    return 'rgba(' + interpolated.r + ',' + interpolated.g + ',' + interpolated.b + ',0.9)';
}

var colorFormatterAttrQA = function (cell, formatterParams) {
    var value = cell.getValue();

    // Check for the specific string "-"
    if (value === "-") {
        return value;
    }

    // Default values
    var defaults = {
        min: 0.0,
        max: 100.0,
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 238, g: 211, b: 217 }
    };

    // Override defaults with provided formatterParams values
    var min = (formatterParams && formatterParams.min) || defaults.min;
    var max = (formatterParams && formatterParams.max) || defaults.max;
    var startColor = (formatterParams && formatterParams.startColor) || defaults.startColor;
    var endColor = (formatterParams && formatterParams.endColor) || defaults.endColor;

    // Normalize the value between 0 and 1
    // var normalizedValue = (value - min) / (max - min);
    var normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));

    // Compute the color gradient 
    var red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
    var green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
    var blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

    // make sure the value is rounded to 2 decimal place
    value = parseFloat(value).toFixed(2)

    return "<span style='display: block; width: 100%; height: 100%; background-color: rgb(" + red + ", " + green + ", " + blue + ");'>" + value + "</span>";
}
var colorFormatterSpaQA = function (cell, formatterParams) {
    var value = cell.getValue();

    // Check for the specific string "-"
    if (value === "-") {
        return value;
    }

    // Default values
    var defaults = {
        min: 0.0,
        max: 100.0,
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 245, g: 232, b: 221 }
    };

    // Override defaults with provided formatterParams values
    var min = (formatterParams && formatterParams.min) || defaults.min;
    var max = (formatterParams && formatterParams.max) || defaults.max;
    var startColor = (formatterParams && formatterParams.startColor) || defaults.startColor;
    var endColor = (formatterParams && formatterParams.endColor) || defaults.endColor;

    // Normalize the value between 0 and 1
    // var normalizedValue = (value - min) / (max - min);
    var normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));

    // Compute the color gradient 
    var red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
    var green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
    var blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

    // make sure the value is rounded to 2 decimal place
    value = parseFloat(value).toFixed(2)

    return "<span style='display: block; width: 100%; height: 100%; background-color: rgb(" + red + ", " + green + ", " + blue + ");'>" + value + "</span>";
}

var colorFormatterNav = function (cell, formatterParams) {
    var value = cell.getValue();

    // Check for the specific string "-"
    if (value === "-") {
        return value;
    }

    // Default values
    var defaults = {
        min: 0.0,
        max: 100.0,
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 204, g: 211, b: 202 }
    };

    // Override defaults with provided formatterParams values
    var min = (formatterParams && formatterParams.min) || defaults.min;
    var max = (formatterParams && formatterParams.max) || defaults.max;
    var startColor = (formatterParams && formatterParams.startColor) || defaults.startColor;
    var endColor = (formatterParams && formatterParams.endColor) || defaults.endColor;

    // Normalize the value between 0 and 1
    // var normalizedValue = (value - min) / (max - min);
    var normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));

    // Compute the color gradient 
    var red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
    var green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
    var blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

    // make sure the value is rounded to 2 decimal place
    value = parseFloat(value).toFixed(2)

    return "<span style='display: block; width: 100%; height: 100%; background-color: rgb(" + red + ", " + green + ", " + blue + ");'>" + value + "</span>";
}
var colorFormatterObjInter = function (cell, formatterParams) {
    var value = cell.getValue();

    // Check for the specific string "-"
    if (value === "-") {
        return value;
    }

    // Default values
    var defaults = {
        min: 0.0,
        max: 100.0,
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 181, g: 192, b: 208 }
    };

    // Override defaults with provided formatterParams values
    var min = (formatterParams && formatterParams.min) || defaults.min;
    var max = (formatterParams && formatterParams.max) || defaults.max;
    var startColor = (formatterParams && formatterParams.startColor) || defaults.startColor;
    var endColor = (formatterParams && formatterParams.endColor) || defaults.endColor;

    // Normalize the value between 0 and 1
    // var normalizedValue = (value - min) / (max - min);
    var normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));

    // Compute the color gradient 
    var red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
    var green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
    var blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

    // make sure the value is rounded to 2 decimal place
    value = parseFloat(value).toFixed(2)

    return "<span style='display: block; width: 100%; height: 100%; background-color: rgb(" + red + ", " + green + ", " + blue + ");'>" + value + "</span>";
}
var colorFormatterSocialInter = function (cell, formatterParams) {
    var value = cell.getValue();

    // Check for the specific string "-"
    if (value === "-") {
        return value;
    }

    // Default values
    var defaults = {
        min: 0.0,
        max: 100.0,
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 215, g: 190, b: 211 }
    };

    // Override defaults with provided formatterParams values
    var min = (formatterParams && formatterParams.min) || defaults.min;
    var max = (formatterParams && formatterParams.max) || defaults.max;
    var startColor = (formatterParams && formatterParams.startColor) || defaults.startColor;
    var endColor = (formatterParams && formatterParams.endColor) || defaults.endColor;

    // Normalize the value between 0 and 1
    // var normalizedValue = (value - min) / (max - min);
    var normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));

    // Compute the color gradient 
    var red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
    var green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
    var blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

    // make sure the value is rounded to 2 decimal place
    value = parseFloat(value).toFixed(2)

    return "<span style='display: block; width: 100%; height: 100%; background-color: rgb(" + red + ", " + green + ", " + blue + ");'>" + value + "</span>";
}
var colorFormatterOveral = function (cell, formatterParams) {
    var value = cell.getValue();

    // Check for the specific string "-"
    if (value === "-") {
        return value;
    }

    // Default values
    var defaults = {
        min: 0.0,
        max: 100.0,
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 198, g: 183, b: 167 }
    };

    // Override defaults with provided formatterParams values
    var min = (formatterParams && formatterParams.min) || defaults.min;
    var max = (formatterParams && formatterParams.max) || defaults.max;
    var startColor = (formatterParams && formatterParams.startColor) || defaults.startColor;
    var endColor = (formatterParams && formatterParams.endColor) || defaults.endColor;

    // Normalize the value between 0 and 1
    var normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)));

    // Compute the color gradient 
    var red = Math.floor(startColor.r + (endColor.r - startColor.r) * normalizedValue);
    var green = Math.floor(startColor.g + (endColor.g - startColor.g) * normalizedValue);
    var blue = Math.floor(startColor.b + (endColor.b - startColor.b) * normalizedValue);

    // make sure the value is rounded to 2 decimal place
    value = parseFloat(value).toFixed(2)

    return "<span style='display: block; width: 100%; height: 100%; background-color: rgb(" + red + ", " + green + ", " + blue + ");'>" + value + "</span>";
}

document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        fetch('website/data/embodiedeval_data.json').then(response => response.json()),
        fetch('website/data/add_human.json').then(response => response.json()),
    ])
        .then(([
            embodiedeval_data,
            add_human
        ]) => {
            var getColumnMinMax = (data, field) => {
                let values = data.map(item => item[field]).filter(val => val !== "-").map(Number);
                return { min: Math.min(...values), max: Math.max(...values) };
            };
            
            var embodiedeval_columns = [
                {
                    title: "Model",
                    field: "model",
                    widthGrow: 1.5,
                    minWidth: 70

                },
                {
                    title: "Attribute QA",
                    columns: [
                        { title: "SR", field: "attr_qa_sr", hozAlign: "center", formatter: colorFormatterAttrQA, minWidth: 70}
                    ]
                },
                {
                    title: "Spatial QA",
                    columns: [
                        { title: "SR", field: "spatial_qa_sr", hozAlign: "center", formatter: colorFormatterSpaQA, minWidth: 70}
                    ]
                }, 
                {
                    title: "Navigation",
                    headerHozAlign: "center",
                    columns: [
                        { title: "SR", field: "nav_sr", hozAlign: "center", formatter: colorFormatterNav, minWidth: 70},
                        { title: "GcS", field: "nav_gcs", hozAlign: "center", formatter: colorFormatterNav, minWidth: 70},
                        { title: "SPL", field: "nav_spl", hozAlign: "center", formatter: colorFormatterNav, minWidth: 70}
                    ]
                },  
                {
                    title: "Object Interaction",
                    headerHozAlign: "center",
                    columns: [
                        { title: "SR", field: "obj_inter_sr", hozAlign: "center", formatter: colorFormatterObjInter, minWidth: 70},
                        { title: "GcS", field: "obj_inter_gcs", hozAlign: "center", formatter: colorFormatterObjInter, minWidth: 70},
                        { title: "SPL", field: "obj_inter_spl", hozAlign: "center", formatter: colorFormatterObjInter, minWidth: 70}
                    ]
                },  
                {
                    title: "Social Interaction",
                    headerHozAlign: "center",
                    columns: [
                        { title: "SR", field: "social_inter_sr", hozAlign: "center", formatter: colorFormatterSocialInter, minWidth: 70},
                        { title: "GcS", field: "social_inter_gcs", hozAlign: "center", formatter: colorFormatterSocialInter, minWidth: 70},
                        { title: "SPL", field: "social_inter_spl", hozAlign: "center", formatter: colorFormatterSocialInter, minWidth: 70}
                    ]
                },  
                {
                    title: "Overall",
                    headerHozAlign: "center",
                    columns: [
                        { title: "SR", field: "overall_sr", sorter: "number", hozAlign: "center", formatter: colorFormatterOveral, minWidth: 70},
                        { title: "GcS", field: "overall_gcs", sorter: "number", hozAlign: "center", formatter: colorFormatterOveral, minWidth: 70}
                    ]
                },   
            ];

            embodiedeval_columns.forEach(column => {
                if (column.columns) {
                    column.columns.forEach(subColumn => {
                        let { min, max } = getColumnMinMax(embodiedeval_data, subColumn.field);
                        subColumn.formatterParams = { min, max };
                    });
                } 
            });

            var embodiedeval_table = new Tabulator("#embodiedeval-main-table", {
                data: embodiedeval_data,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                responsiveLayoutCollapseStartOpen: false,
                movableColumns: false,
                initialSort: [
                    { column: "overall_sr", dir: "desc" },
                    { column: "overall_gcs", dir: "desc" },
                ],
                columnDefaults: {
                    tooltip: true,
                },
                columns: embodiedeval_columns
            });

            var add_human_table = new Tabulator("#add_human-main-table", {
                data: add_human,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                responsiveLayoutCollapseStartOpen: false,
                movableColumns: false,
                initialSort: [
                    { column: "overall_sr", dir: "desc" },
                    { column: "overall_gcs", dir: "desc" },
                ],
                columnDefaults: {
                    tooltip: true,
                },
                columns: embodiedeval_columns
            });

        });
})

