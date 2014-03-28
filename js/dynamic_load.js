function load_html_css_js(fileType, fileName, contextDict, targetDiv)
{
    if (fileType.toLowerCase() == "css")
    {
        tmp_ele = document.createElement("style");
        append_to("head", tmp_ele);
    }
    else if (fileType.toLowerCase() == "js")
    {
        tmp_ele = document.createElement("script");
        append_to("head", tmp_ele);
    }
    else if (fileType.toLowerCase() == "html")
    {
        if (!targetDiv)
        {
            tmp_body = document.getElementsByTagName("body")[0];
            targetDiv = tmp_body;

            console.log(document.getElementsByTagName("body")[0]);
        }
        tmp_ele = targetDiv;
    }
    else
    {
        //raise error
    }

    targetDiv = tmp_ele;

    function func_success(xhr)
    {
        load_template(targetDiv, remove_multi_comment(xhr.responseText), contextDict);
    }
    do_xhr(fileName, func_success);

    return tmp_ele;
}

function append_to(tagName, tmp_ele)
{
    tmp_head = document.getElementsByTagName(tagName)[0];
    tmp_head.appendChild(tmp_ele);
}

function load_template(targetDiv, fileText, contextDict)
{
    func_template = doT.template(fileText);
    targetDiv.innerHTML = func_template(contextDict);
    console.log(targetDiv.innerHTML);
    // think about returning func_template for efficient drawing of multiple similar graphs
}
// regexp to remove multi-line comment -> /\/\*(.*)\*\//g
// only /* or */ -> (\/\*)|(\*\/)
function remove_multi_comment(tmp_str)
{
    regexp_multi_comment = /(\/\*)|(\*\/)/g; // compile and re-use it
    replaced_str = tmp_str.replace(regexp_multi_comment, "");
    return replaced_str;
}

function do_xhr(fileName, func_success)
{
    var xhr = createXHR();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4)
        {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
            {
                func_success(xhr);
            }
            else
            {
                alert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    xhr.open("get", fileName, true);
    xhr.send(null);
}

function createXHR()
{
    if (typeof XMLHttpRequest != "undeﬁned")
    {
        return new XMLHttpRequest();
    }
    else if (typeof ActiveXObject != "undeﬁned")
    {
        if (typeof arguments.callee.activeXString != "string")
        {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i, len;

            for (i = 0, len = versions.length; i < len; i++)
            {
                try
                {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }
                catch (ex)
                {
                    //skip
                }
            }
        }

        return new ActiveXObject(arguments.callee.activeXString);
    }
    else
    {
        throw new Error("No XHR object available.");
    }
}
