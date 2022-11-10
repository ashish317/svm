

        var alfa = 0.001;
        var maxIteration = 300000;

        var w1 = 1;
        var w2 = 1;
        var b = 1;
        var dw1 = 0;
        var dw2 = 0;
        var db = 0;

        var datas = [

            { c: 1, x:10, y: 100 },
            { c: 1, x:-10, y: 50 },
            { c: 1, x:50, y: 150 },
            { c: 1, x:100, y: 80 }, 
            { c: 1, x:30, y: 200 },
            { c: 1, x:200, y: 50 },
            { c: 1, x: 120, y: 30 },
            { c: 1, x: 100, y: 150 },
            { c: 1, x: 300, y: 50 },
            { c: 1, x: -150, y: 200 },
            { c: 1, x: -300, y: 400 },
            { c: 1, x: 233, y: 333 },
            { c: 1, x: 127, y: 190 },
            { c: 1, x: 100, y: -32},
            { c: 1, x: -50, y: -12 },
            { c: 1, x: -101, y: -50 },
            { c: 1, x: -301, y: -19 },
            { c: 1, x: 127, y: -22 },
            { c: -1, x:120, y: -100 },
            { c: -1, x:-50, y: -200 },
            { c: -1, x:800, y: 100 },
            { c: -1, x:150, y: -150 },
            { c: -1, x:70, y: -80 },
            { c: -1, x: 70, y: -500 },
            { c: -1, x: 200, y: -300 },
            { c: -1, x: -50, y: -150 },
            { c: -1, x: 111, y: -200 },
            { c: -1, x: 301, y: -310 },
            { c: -1, x: 200, y: -151 },
            { c: -1, x: -122, y: -99 },
            { c: -1, x: -301, y: -499 },
            { c: -1, x: 401, y: -1 },
        ]

        function getHingeLoss(data) {

            let loss = 1 - (w1 * data.x + w2 * data.y + b) * data.c;

            if (loss > 0)
                return loss;
            else
                return 0;
        }

        function setGradients() {

            let cost = 0;

            for (let i = 0; i < datas.length; i++) {

                let loss = getHingeLoss(datas[i]);
                cost += loss;

                if (loss > 0) {

                    dw1 += (-1 * datas[i].x * datas[i].c);
                    dw2 += (-1 * datas[i].y * datas[i].c);
                    db += (-1 * datas[i].c);
                }
            }

            cost /= datas.length;
            dw1 /= datas.length;
            dw2 /= datas.length;
            db /= datas.length;

            return cost;
        }

        function train() {

            setValues();
            drawPoints();

            for (var i = 0; i < maxIteration; i++) {

                setGradients();

                w1 -= alfa * dw1;
                w2 -= alfa * dw2;
                b -= alfa * db;             
            }

            drawLine();

            let resultDiv = document.getElementById("resultDiv");
            resultDiv.innerHTML = "w1:" + w1 + ", w2:" + w2 + ",b:" + b;
        }

        function drawPoints() {

            var canvas = document.getElementById("g");

            for (let i = 0; i < datas.length; i++) {

                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');;
                circle.setAttributeNS(null, "cx", datas[i].x);
                circle.setAttributeNS(null, "cy", datas[i].y);
                circle.setAttributeNS(null, "r", 1);

                if (datas[i].c == 1)
                    circle.setAttributeNS(null, "fill", "red");
                else
                    circle.setAttributeNS(null, "fill", "blue");

                canvas.appendChild(circle);
            }
        }

        function drawLine() {

            var canvas = document.getElementById("g");

            let point1x = 1000;
            let point1y = (w1 * point1x + b) / (-1 * w2);
            let point2x = -1000;
            let point2y = (w1 * point2x + b) / (-1 * w2);

            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttributeNS(null, "x1", point1x);
            line.setAttributeNS(null, "y1", point1y);
            line.setAttributeNS(null, "x2", point2x);
            line.setAttributeNS(null, "y2", point2y);
            line.setAttributeNS(null, "style", "stroke: rgb(0, 255, 0); stroke-width:1");
            canvas.appendChild(line);
        }

        function setValues() {

            alfa = parseFloat(document.getElementById("alfa").value);
            maxIteration = parseFloat(document.getElementById("maxIteration").value);
        }

   