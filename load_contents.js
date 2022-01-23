var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        // qualifier to aspect_no
        qualifier_to_aspect_no = {};
        qualifier_to_aspect_no['genetics'] = 'aspect1';
        qualifier_to_aspect_no['metabolism'] = 'aspect2';
        qualifier_to_aspect_no['therapy'] = 'aspect3';
        qualifier_to_aspect_no['pathology'] = 'aspect4';
        qualifier_to_aspect_no['drug effects'] = 'aspect5';
        qualifier_to_aspect_no['surgery'] = 'aspect6';
        qualifier_to_aspect_no['hematology'] = 'aspect7';
        qualifier_to_aspect_no['immunology'] = 'aspect8';
        qualifier_to_aspect_no['diagnosis'] = 'aspect9';
        qualifier_to_aspect_no['mortality'] = 'aspect10';
        qualifier_to_aspect_no['epidemiology'] = 'aspect11';
        qualifier_to_aspect_no['complications'] = 'aspect12';

        // qualifier to color
        qualifier_to_color = {};
        qualifier_to_color['genetics'] = '#dc3545'; // --bs-red
        qualifier_to_color['metabolism'] = '#17a2b8'; // --bs-cyan
        qualifier_to_color['therapy'] = '#fd7e14'; // --bs-orange
        qualifier_to_color['pathology'] = '#C0CA33'   // lime
        qualifier_to_color['drug effects'] = '#007bff'; // --bs-blue
        qualifier_to_color['surgery'] = '#9CCC65';  // light green
        qualifier_to_color['hematology'] = '#BA68C8';  // purple
        qualifier_to_color['immunology'] = '#28a745'; // --bs-green
        qualifier_to_color['diagnosis'] = '#B39DDB'; // deep purple
        qualifier_to_color['mortality'] = '#FF8A65'; // deep orange
        qualifier_to_color['epidemiology'] = '#e83e8c'; // --bs-pink
        qualifier_to_color['complications'] = '#20c997'; // --bs-teal


        // parse json file
        var data = JSON.parse(this.responseText);

        // make qualifiers selected in the checkboxes
        var qualifiers = data.qualifiers;
        var qualifiers_array = qualifiers.split(",");
        for (var i=0; i<qualifiers_array.length; i++){
            var qualifier = qualifiers_array[i];
            document.getElementById(qualifier).classList.add("active");
        }

        // add qualifiers in the query section
        var qualifier_selection_info = "";
        for (var i=0; i<qualifiers_array.length; i++){
            var qualifier = qualifiers_array[i];
            var qualifier_color = qualifier_to_color[qualifier];
            qualifier_selection_info += `<span style="font-size:20px; color:white; background-color:`+qualifier_color+`">`+qualifier+`</span>&nbsp;`;
        }
        document.getElementById('selected_qualifiers').innerHTML = qualifier_selection_info;

        // add topic in the query section
        document.getElementById('selected_topic').innerHTML = `<span style="font-size:20px; color:black;">`+data.topic+`</span>&nbsp;`;

        // add qualifier definition
        // in this case we actually have only one qualifer
        if(data.qualifiers=='genetics'){
            document.getElementById('selected_qualifier_definition').innerHTML = "study of genes, heredity, and variation in living organisms";
        }
        if(data.qualifiers=='metabolism'){
            document.getElementById('selected_qualifier_definition').innerHTML = "set of chemical reactions and pathways by which living organisms transform chemical substances";
        }
        if(data.qualifiers=='therapy'){
            document.getElementById('selected_qualifier_definition').innerHTML = "attempted medical remediation of a health problem";
        }
        if(data.qualifiers=='pathology'){
            document.getElementById('selected_qualifier_definition').innerHTML = "description of organ, tissue or cell structure in disease and disease states";
        }
        if(data.qualifiers=='drug effects'){
            document.getElementById('selected_qualifier_definition').innerHTML = "the effects of drugs and chemicals";
        }
        if(data.qualifiers=='surgery'){
            document.getElementById('selected_qualifier_definition').innerHTML = "operative procedures on organs or tissues in the treatment of diseases";
        }
        if(data.qualifiers=='hematology'){
            document.getElementById('selected_qualifier_definition').innerHTML = "study of blood, blood-forming organs, and blood diseases";
        }
        if(data.qualifiers=='immunology'){
            document.getElementById('selected_qualifier_definition').innerHTML = "branch of medicine studying the immune system";
        }
        if(data.qualifiers=='diagnosis'){
            document.getElementById('selected_qualifier_definition').innerHTML = "process to determine or identify a disease or disorder, which would account for a person's symptoms and signs";
        }
        if(data.qualifiers=='mortality'){
            document.getElementById('selected_qualifier_definition').innerHTML = "measure of the number of deaths in a population from a given cause in a set period of time";
        }
        if(data.qualifiers=='epidemiology'){
            document.getElementById('selected_qualifier_definition').innerHTML = "study and analysis of the distribution, patterns and determinants of diseases in a population";
        }
        if(data.qualifiers=='complications'){
            document.getElementById('selected_qualifier_definition').innerHTML = "indicate conditions that co-exist or follow a disease";
        }


        // add question: Does the article belong to the predicted topic xxx under the topic xxx?
        var question_text = `<p style="font-size: x-large; padding-top:3px;">Is the article about the topic `+`<span style="color:white; background-color:`+qualifier_color+`">`+qualifier+`</span>`+` under the medical subject <u><b>`+data.topic+`</b></u>?</p>`;
        document.getElementById('question').innerHTML = question_text;


        // add sentences and probabilities
        var contents = data.content;
        var contents_section = document.getElementById('contents');
        for(var i=0; i<contents.length; i++){
            // add sentences text
            var sentence = document.createElement("div");
            sentence.innerHTML = contents[i].text;
            // set class name and other attributes
            sentence.className = "sentences";
            sentence.setAttribute("pmid", document.getElementById('_pmid').innerHTML);
            sentence.setAttribute("sentence_no", i+1);
            contents_section.appendChild(sentence);
        }

        // add explanation, select box and evidence based on different system versions
        var sys_version = data.version;
        var explanation = document.getElementById("explanation");

        // v1: no explanation
        // no need to do anything

        // v2: only probabilities
        if (sys_version == '2'){
            var overall_probabilities = data.probs;
            var overall_probabilities_array = overall_probabilities.split(",");
            var output_prob = "<p>System's confidence for topic:</p>";
            for (var i=0; i<qualifiers_array.length; i++){
                var qualifier = qualifiers_array[i];
                var qualifier_prob = overall_probabilities_array[i];
                qualifier_prob = parseFloat(qualifier_prob).toFixed(0);
                var qualifier_color = qualifier_to_color[qualifier];
                output_prob +=  `<h5 style="color:`+qualifier_color+`">`+qualifier+`</h5>` + `<div class="progress"><div class="progress-bar" role="progressbar" style="background-color:`+qualifier_color+`; width:`+qualifier_prob+`%" aria-valuenow="`+qualifier_prob+`" aria-valuemin="0" aria-valuemax="100">`+qualifier_prob+`%</div></div>`;
            }

            var prob = document.createElement("div");
            prob.id = "probability";
            prob.innerHTML = output_prob;
            explanation.appendChild(prob);
        }

        // v3: only highlighting
        if (sys_version == '3'){
            var p2 = document.createElement("p");
            p2.innerHTML = "<br><p>Click on a topic to see influential sentences in the system's prediction:</p>"
            explanation.appendChild(p2);

            // create select box and add radio buttons for qualifiers
            var div_select_box = document.createElement("div");
            var select_box_html_string = `<div class="btn-group" role="group" aria-label="radio button group">`;
           for (var i=0; i<qualifiers_array.length; i++){
                var qualifier = qualifiers_array[i];
                var qualifier_no = qualifier_to_aspect_no[qualifier];
                select_box_html_string += `<input type="radio" class="btn-check" name="explanation_aspect" id="`+qualifier_no+`" value = "`+qualifier_no+`" autocomplete="off" onclick=show_explanation("`+ qualifier_no+`")><label class="btn btn-outline-secondary" for="`+qualifier_no+`">`+qualifier+`</label>`;
            }

            // add "hide" choice
            select_box_html_string += `<input type="radio" class="btn-check" name="explanation_aspect" id="Hide" autocomplete="off" onclick=show_explanation("Hide") ><label class="btn btn-outline-secondary" for="Hide">Hide</label>`;
            select_box_html_string += "</div>";
            div_select_box.innerHTML = select_box_html_string;
            explanation.appendChild(div_select_box);

            // create color legend
            var div_color_legend = document.createElement("div");
            div_color_legend.id = "color_legened";
            div_color_legend.style.visibility = "hidden";

            div_color_legend.innerHTML=`
            <br>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"></li>
                <li class="list-group-item"><span id='legend4'><span style="color:white">Most influential</span></span></li>
                <li class="list-group-item"><span id='legend3'>Highly influential</span></li>
                <li class="list-group-item"><span id='legend2'>Moderately influential</span></li>
                <li class="list-group-item"><span id='legend1'>Less influential</span></li>
                <li class="list-group-item"><span>Not influential</span></li>
                <li class="list-group-item"></li>
            </ul>
            <br>
            `
            explanation.appendChild(div_color_legend);
        }

        // v4: probabilities + highlighting
        if (sys_version == '4'){
            var overall_probabilities = data.probs;
            var overall_probabilities_array = overall_probabilities.split(",");
            var output_prob = "<p>System's confidence for topic:</p>";
            for (var i=0; i<qualifiers_array.length; i++){
                var qualifier = qualifiers_array[i];
                var qualifier_prob = overall_probabilities_array[i];
                qualifier_prob = parseFloat(qualifier_prob).toFixed(0);
                var qualifier_color = qualifier_to_color[qualifier];
                output_prob +=  `<h5 style="color:`+qualifier_color+`">`+qualifier+`</h5>` + `<div class="progress"><div class="progress-bar" role="progressbar" style="background-color:`+qualifier_color+`; width:`+qualifier_prob+`%" aria-valuenow="`+qualifier_prob+`" aria-valuemin="0" aria-valuemax="100">`+qualifier_prob+`%</div></div>`;
            }

            var prob = document.createElement("div");
            prob.id = "probability";
            prob.innerHTML = output_prob;
            explanation.appendChild(prob);


            var p2 = document.createElement("p");
            p2.innerHTML = "<br><p>Click on a topic to see influential sentences in the system's prediction:</p>"
            explanation.appendChild(p2);

            // create select box and add radio buttons for qualifiers
            var div_select_box = document.createElement("div");
            var select_box_html_string = `<div class="btn-group" role="group" aria-label="radio button group">`;
           for (var i=0; i<qualifiers_array.length; i++){
                var qualifier = qualifiers_array[i];
                var qualifier_no = qualifier_to_aspect_no[qualifier];
                select_box_html_string += `<input type="radio" class="btn-check" name="explanation_aspect" id="`+qualifier_no+`" value = "`+qualifier_no+`" autocomplete="off" onclick=show_explanation("`+ qualifier_no+`")><label class="btn btn-outline-secondary" for="`+qualifier_no+`">`+qualifier+`</label>`;
            }

            // add "hide" choice
            select_box_html_string += `<input type="radio" class="btn-check" name="explanation_aspect" id="Hide" autocomplete="off" onclick=show_explanation("Hide") ><label class="btn btn-outline-secondary" for="Hide">Hide</label>`;
            select_box_html_string += "</div>";
            div_select_box.innerHTML = select_box_html_string;
            explanation.appendChild(div_select_box);


            // create color legend
            var div_color_legend = document.createElement("div");
            div_color_legend.id = "color_legened";
            div_color_legend.style.visibility = "hidden";

            div_color_legend.innerHTML=`
            <br>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"></li>
                <li class="list-group-item"><span id='legend4'><span style="color:white">Most influential</span></span></li>
                <li class="list-group-item"><span id='legend3'>Highly influential</span></li>
                <li class="list-group-item"><span id='legend2'>Moderately influential</span></li>
                <li class="list-group-item"><span id='legend1'>Less influential</span></li>
                <li class="list-group-item"><span>Not influential</span></li>
                <li class="list-group-item"></li>
            </ul>
            <br>
            `
            explanation.appendChild(div_color_legend);
        }
    }
};

// read json file by id
var file_url = document.getElementById('_pmid').innerHTML + ".txt";
xmlhttp.open("GET", file_url, true);
xmlhttp.send();