addEventListener("load", load_em_all);

points = [
    ["0%", "20%"],
    ["20%", "60%"],
    ["45%", "45%"],
    ["55%", "30%"],
    ["85%", "80%"]
];

function load_em_all()
{
    load_html_css_js("html", "area.html",
    {
        "points": points,
        "point_radius": "10px"
    });
    load_html_css_js("css", "area.css",
    {
        "points": points,
        "point_radius": "5px"
    });
}

// load_em_all();
// console.log("Loaded stuffs");
