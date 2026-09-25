
(function MejorarInterfazNivel3() {
    const estilo = document.createElement("style");
    estilo.id = "EstiloMejoradoNivel3";
    estilo.textContent = `
html,body{width:100%;height:100%;margin:0;overflow:hidden!important}
#NIVEL3{width:100vw;height:100vh;min-height:100vh;overflow:hidden!important;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;padding:10px 12px}
#NIVEL3 .Contenedorlvl3{width:min(900px,calc(100vw - 24px));max-width:900px;box-sizing:border-box}
#NIVEL3 .Cabezeralvl3{height:78px;min-height:78px;width:min(900px,calc(100vw - 24px));box-sizing:border-box;border:2px solid rgba(255,70,70,.95);border-bottom:0;background:linear-gradient(135deg,rgba(10,18,38,.94),rgba(50,65,95,.82));box-shadow:0 8px 25px rgba(0,0,0,.45);backdrop-filter:blur(8px);border-radius:14px 14px 0 0;display:flex;align-items:center;padding:8px 12px;gap:10px}
#NIVEL3 .Tiempolvl3,#NIVEL3 .Puntajelvl3{width:18%;min-width:105px;height:60px;color:#fff;line-height:1.05;border-radius:10px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.18);box-shadow:inset 0 0 18px rgba(255,255,255,.04)}
#NIVEL3 .Tiempolvl3 h3,#NIVEL3 .Puntajelvl3 h3{margin:0 0 5px;font-size:12px;letter-spacing:1px}
#NIVEL3 .Tiempolvl3 span,#NIVEL3 .Puntajelvl3 span{font-size:20px;font-weight:700}
#NIVEL3 .Pauselvl3{width:220px;max-width:34%;height:52px;min-height:52px;margin-left:auto;left:auto;top:auto;position:relative;border-radius:10px;background:linear-gradient(135deg,#ff3131,#c40000);box-shadow:0 6px 18px rgba(255,0,0,.28);font-size:12px;font-weight:700;letter-spacing:.5px}
#NIVEL3 .Contenedorlvl3:not(.Cabezeralvl3){height:min(500px,calc(100vh - 110px));min-height:420px;border:2px solid rgba(255,70,70,.95);border-radius:0 0 14px 14px;top:0;box-shadow:0 12px 35px rgba(0,0,0,.5)}
#NIVEL3 .Startlvl3{width:100%;height:100%;padding:25px 30px;box-sizing:border-box;overflow:hidden;background:radial-gradient(circle at 50% 45%,rgba(70,90,160,.20),transparent 48%),rgba(0,0,0,.62);backdrop-filter:blur(2px)}
#NIVEL3 .Textolvl3{width:min(92%,760px);max-width:760px;margin:0 auto;padding:18px 24px;box-sizing:border-box;font-size:clamp(20px,3.1vw,36px);line-height:1.45;letter-spacing:1px;overflow-wrap:break-word;border:1px solid rgba(255,255,255,.24);border-radius:18px;background:linear-gradient(135deg,rgba(6,12,28,.86),rgba(25,32,58,.62));box-shadow:0 12px 35px rgba(0,0,0,.42),inset 0 0 25px rgba(100,130,255,.08)}
#NIVEL3 #Dificultadlvl3{width:min(92%,760px);max-width:760px;left:0;top:auto;position:relative;display:flex;align-items:center;justify-content:center;gap:12px;box-sizing:border-box;padding:12px 18px;border:1px solid rgba(255,255,255,.22);border-radius:16px;background:rgba(8,15,32,.76);box-shadow:0 10px 28px rgba(0,0,0,.35);overflow:hidden}
#NIVEL3 #Dificultadlvl3 img{width:clamp(52px,8vw,88px)!important;max-width:88px;height:auto;flex:0 0 auto}
#NIVEL3 #Dificultadlvl3 h1{margin:0;max-width:100%;font-size:clamp(14px,2vw,24px)!important;line-height:1.35;overflow-wrap:break-word;text-align:center}
#NIVEL3 #Playlvl3{width:min(260px,60%);min-width:190px;height:58px;min-height:58px;margin:4px auto;border-radius:12px;background:linear-gradient(135deg,#ff3434,#d50000);box-shadow:0 8px 22px rgba(255,0,0,.30);font-size:18px;letter-spacing:2px}
#NIVEL3 #Contenedor_contadorlvl3{width:100%;height:100%;left:0;top:0;z-index:20}
#NIVEL3 #RGBlvl3{font-size:clamp(100px,18vw,190px);text-shadow:0 0 25px rgba(255,255,255,.45)}
#NIVEL3 .Pausa_Pantallalvl3{width:100%;height:100%;border-radius:0 0 12px 12px;background:rgba(0,0,0,.78);backdrop-filter:blur(6px)}
#NIVEL3 .Mensaje_Pauselvl3{max-width:90%;padding:25px;box-sizing:border-box;font-size:clamp(24px,4vw,50px);line-height:1.35;overflow-wrap:break-word;border:1px solid rgba(255,255,255,.2);border-radius:16px;background:rgba(15,20,40,.82);box-shadow:0 12px 35px rgba(0,0,0,.5)}
#NIVEL3 .Meteoritolvl3{max-width:70px;z-index:1000;user-select:none}
#NIVEL3 .Planetalvl3{max-width:40%;height:auto}
@media(max-width:700px){
#NIVEL3{padding:6px}
#NIVEL3 .Cabezeralvl3{height:66px;min-height:66px;padding:5px 7px}
#NIVEL3 .Tiempolvl3,#NIVEL3 .Puntajelvl3{min-width:80px;width:22%;height:52px}
#NIVEL3 .Tiempolvl3 h3,#NIVEL3 .Puntajelvl3 h3{font-size:9px}
#NIVEL3 .Tiempolvl3 span,#NIVEL3 .Puntajelvl3 span{font-size:16px}
#NIVEL3 .Pauselvl3{max-width:38%;height:46px;min-height:46px;font-size:9px}
#NIVEL3 .Contenedorlvl3:not(.Cabezeralvl3){height:calc(100vh - 82px);min-height:350px}
#NIVEL3 .Textolvl3{width:94%;padding:14px}
#NIVEL3 #Dificultadlvl3{width:94%;gap:6px;padding:8px}
#NIVEL3 #Dificultadlvl3 h1{font-size:12px!important}
}
`;
    document.head.appendChild(estilo);

    const texto = (id, valor) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    };
    texto("Textolvl3","¿LISTO PARA SALVAR EL MUNDO? · NIVEL 3");
    texto("Pauselvl3","PAUSAR / CONTINUAR");
    texto("Puntajelvl3","0 / 40");
    const dificultad = document.querySelector("#Dificultadlvl3 h1");
    if (dificultad) dificultad.textContent = "Dificultad: MEGALODÓN";
    const pausa = document.querySelector("#Pausa_Pantallalvl3 .Mensaje_Pauselvl3");
    if (pausa) pausa.innerHTML = "JUEGO EN PAUSA";
})();

Tiempolvl3 = 51 //VARIBLE DE INICIO TIEMPO
Puntajelvl3 = 0 //VARIABLE DE INICIO PUNTOS

//CONTENEDOR QUE CONTIENE TOO EL JUEGO
//DE POR SI ESTA FUNCION NO SE EJECUTA HASTA QUE SE LA LLAMA, MAS ADELANTE LA LLAMAREMOS
//PARA QUE EL JUEGO INICIE UNA VEZ SE PRESIONE JUGAR
function JUEGOlvl3() {

    //FUNCION QUE REDUCE EL TIEMPO Y RESETEAL EL RESULTADO UNA VEZ LLEGUE A 0
    function Tiempo_Disminurlvl3() { 
        Tiempolvl3--;
        document.getElementById("Tiempolvl3").innerHTML = Tiempolvl3
        if (Tiempolvl3 == 0) {
            Tiempolvl3 = 51
            Puntajelvl3 = 0
            alert("Lo lamento perdiste")
        }
    }
    Restar_Tiempolvl3 = setInterval(Tiempo_Disminurlvl3, 1000)

    //AÑADIMOS LA FUNCION AUMENTAR PUNTOS AL PASAR EL CURSOR SOBRE LOS METEORITOS
    document.getElementById("Meteoritolvl3").addEventListener('mouseover', Aumentar_Puntoslvl3)
    document.getElementById("Meteorito2lvl3").addEventListener('mouseover', Aumentar_Puntoslvl3)
    document.getElementById("Meteorito3lvl3").addEventListener('mouseover', Aumentar_Puntoslvl3)
    document.getElementById("Meteorito4lvl3").addEventListener('mouseover', Aumentar_Puntoslvl3)


    //FUNCION QUE UNICAMENTE AUMENTA PUNTOS Y RESETEA LAS VARIABLES AL LLEGAR A CIERTO LIMITE
    function Aumentar_Puntoslvl3() {
        Puntajelvl3++;
        document.getElementById("Puntajelvl3").innerHTML = Puntajelvl3 + " / 40"
        if (Puntajelvl3 >= 40) {
            Puntajelvl3 = 0
            Tiempolvl3 = 51
            function Contactos(){
            Swal.fire({
                title : 'Felicitaciones por parte del <br> Grupo Omega<br><br><img src="IMG/Logo_Omega.png" width = "120px">',
                html: '<b class="Aumentar puntos">Sabia que lo lograrias, nos salVaste de la destrucciÓn, pero ahora nos espera otra lucha, esperemos volVerte a ver jugando IRON FIST 2 en un futuro <br><br> CONTACTOS:<br><br> 71727432@certus.edu.pe <br><br> 71663265@certus.edu.pe <br><br> 70845813@certus.edu.pe <br> </b>',
                icon: 'success',
                confirmButtonText: '<span id="Pausear_musica">De acuerdo</span>',
                width: '50%',
                height: '80%',
                timer: 100000,
                
                
                timerProgressbar: true,
                /*Funcion de cerrar la alerta*/
                allowOutsideClick: true,
                allowEscapeKey: false,
                allowEnterkey: false,
                stopKeydownPropagation: false,
                });
            }
            setTimeout(Contactos, 15000)

            
            document.getElementById("Fondo_Ciberpunk").pause()
            document.getElementById("Triunfo").play()

            function Ganaste_Pantallalvl3(){
            document.getElementById("Meteoritolvl3").style.left = "-70%"
            document.getElementById("Meteoritolvl3").style.transition = "0s"

            document.getElementById("Meteorito2lvl3").style.left = "-70%"
            document.getElementById("Meteorito2lvl3").style.transition = "0s"
            
            document.getElementById("Meteorito3lvl3").style.left = "-70%"
            document.getElementById("Meteorito3lvl3").style.transition = "0s"
            
            document.getElementById("Meteorito4lvl3").style.left = "-70%"
            document.getElementById("Meteorito4lvl3").style.transition = "0s"}

            setInterval(Ganaste_Pantallalvl3, 1)

            Tiempolvl3 = 51
            Puntajelvl3 = 0

            clearInterval(Intervalo_Dirlvl3)
            clearInterval(Intervalo_Dir2lvl3)
            clearInterval(Intervalo_Dir3lvl3)
            clearInterval(Intervalo_Dir4lvl3)
            clearInterval(Restar_Tiempolvl3)

            document.getElementById("Musica_Final").play()

            document.getElementById("Pantalla_Ovnislvl3").style.left = "7%"
            document.getElementById("Pantalla_Ovnislvl3").style.transition = "6s"
            document.getElementById("Pantalla_Nodrizalvl3").style.left = "10%"
            document.getElementById("Pantalla_Nodrizalvl3").style.transition = "5s"
            document.getElementById("Pantalla_Ovnis2lvl3").style.left = "7%"
            document.getElementById("Pantalla_Ovnis2lvl3").style.transition = "6s"

            function Creditoslvl3() {
                document.getElementById("Pantalla_creditoslvl3").style.background = "black"
                document.getElementById("Creditoslvl3").style.top = "-15%"
                document.getElementById("Creditoslvl3").style.transition = "10s"
                document.getElementById("Proximolvl3").style.bottom = "-34%"
                document.getElementById("Proximolvl3").style.transition = "15s"
            }
            setTimeout(Creditoslvl3, 5000)
        }
    }

    //ESTA FUNCION DIRIGE AL PRIMER METEORITO 1 A LA TIERRA 
    function Meteorito_Direccionlvl3() {
        Distancia1lvl3 = 80
        Altura1lvl3 = Math.round(Math.random() * 450)

        document.getElementById("Meteoritolvl3").style.left = Distancia1lvl3 + "%"
        document.getElementById("Meteoritolvl3").style.top = Altura1lvl3 + "px"
        document.getElementById("Meteoritolvl3").style.transition = "1.9s"
    }

    setTimeout(Meteorito_Direccionlvl3, 2200)
    Intervalo_Dirlvl3 = setInterval(Meteorito_Direccionlvl3, 2950)

    //ESTA FUNCION DIRIGE AL METEORITO 2 A LA TIERRA         
    function Meteorito_Direccion2lvl3() {
        Distancia2lvl3 = 80
        Altura2lvl3 = Math.round(Math.random() * 450)

        document.getElementById("Meteorito2lvl3").style.left = Distancia2lvl3 + "%"
        document.getElementById("Meteorito2lvl3").style.top = Altura2lvl3 + "px"
        document.getElementById("Meteorito2lvl3").style.transition = "1.9s"
    }

    setTimeout(Meteorito_Direccion2lvl3, 2660)
    Intervalo_Dir2lvl3 = setInterval(Meteorito_Direccion2lvl3, 2750)

    //ESTA FUNCION DIRIGE AL METEORITO 3 A LA TIERRA
    function Meteorito_Direccion3lvl3() {
        Distancia3lvl3 = 80
        Altura3lvl3 = Math.round(Math.random() * 450)

        document.getElementById("Meteorito3lvl3").style.left = Distancia3lvl3 + "%"
        document.getElementById("Meteorito3lvl3").style.top = Altura3lvl3 + "px"
        document.getElementById("Meteorito3lvl3").style.transition = "1.9s"
    }

    setTimeout(Meteorito_Direccion3lvl3, 2900)
    Intervalo_Dir3lvl3 = setInterval(Meteorito_Direccion3lvl3, 2550)

    //ESTA FUNCION DIRIGE AL METEORITO 4 A LA TIERRA
    function Meteorito_Direccion4lvl3() {
        Distancia4lvl3 = 80
        Altura4lvl3 = Math.round(Math.random() * 450)

        document.getElementById("Meteorito4lvl3").style.left = Distancia4lvl3 + "%"
        document.getElementById("Meteorito4lvl3").style.top = Altura4lvl3 + "px"
        document.getElementById("Meteorito4lvl3").style.transition = "1.9s"
    }

    setTimeout(Meteorito_Direccion4lvl3, 3100)
    Intervalo_Dir4lvl3 = setInterval(Meteorito_Direccion4lvl3, 2150)



    //AQUI ADJUNTAMOS LA ACCION DE LA FUNCION EXPULZAR AL PASAR SOBRE EL METEORITO
    document.getElementById("Meteoritolvl3").addEventListener('mouseover', Explulsarlvl3)
    document.getElementById("Meteorito2lvl3").addEventListener('mouseover', Explulsar2lvl3)
    document.getElementById("Meteorito3lvl3").addEventListener('mouseover', Explulsar3lvl3)
    document.getElementById("Meteorito4lvl3").addEventListener('mouseover', Explulsar4lvl3)


    //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 1 DE MANERA ALEATORIA FUERA DEL MAPA
    function Explulsarlvl3() {
        document.getElementById("Puntos_sound").play()
        Distancialvl3 = "-500"
        Alturalvl3 = Math.round(Math.random() * 600)

        document.getElementById("Meteoritolvl3").style.left = Distancialvl3 + "px"
        document.getElementById("Meteoritolvl3").style.top = Alturalvl3 + "px"
        document.getElementById("Meteoritolvl3").style.transition = "1.7s"
    }


    //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 2 DE MANERA ALEATORIA FUERA DEL MAPA
    function Explulsar2lvl3() {
        document.getElementById("Punto2").play()
        Distancialvl3 = "-500"
        Alturalvl3 = Math.round(Math.random() * 500)

        document.getElementById("Meteorito2lvl3").style.left = Distancialvl3 + "px"
        document.getElementById("Meteorito2lvl3").style.top = Alturalvl3 + "px"
        document.getElementById("Meteorito2lvl3").style.transition = "1.7s"
    }


    //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 3 DE MANERA ALEATORIA FUERA DEL MAPA
    function Explulsar3lvl3() {
        document.getElementById("Punto3").play()
        Distancialvl3 = "-500"
        Alturalvl3 = Math.round(Math.random() * 600)

        document.getElementById("Meteorito3lvl3").style.left = Distancialvl3 + "px"
        document.getElementById("Meteorito3lvl3").style.top = Alturalvl3 + "px"
        document.getElementById("Meteorito3lvl3").style.transition = "1.7s"
    }

    //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 4 DE MANERA ALEATORIA FUERA DEL MAPA
    function Explulsar4lvl3() {
        document.getElementById("Punto4").play()
        Distancialvl3 = "-500"
        Alturalvl3 = Math.round(Math.random() * 600)

        document.getElementById("Meteorito4lvl3").style.left = Distancialvl3 + "px"
        document.getElementById("Meteorito4lvl3").style.top = Alturalvl3 + "px"
        document.getElementById("Meteorito4lvl3").style.transition = "1.7s"
    }



    //ESTA FUNCION SE ENCARGA DE ALERTARTE UNA VEZ EL METEORITO CRUZE LA LINEA CON UN PERDISTE
    //TAMBIEN RESETEA LOS VALORES Y LLEVA A LOS METEORITOS FUERA DEL MAPA DE MANERA INSTANTANEA
    function perdistelvl3() {
        if ((document.getElementById("Meteoritolvl3").offsetLeft > 630) ||
            (document.getElementById("Meteorito2lvl3").offsetLeft > 630) ||
            (document.getElementById("Meteorito3lvl3").offsetLeft > 630) ||
            (document.getElementById("Meteorito4lvl3").offsetLeft > 630)) {

                alert("YA ES DEMASIADO TARDE LOS METIORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE LO MEJOR ES ESPERAR LO PEOR")
            document.getElementById("Perdiste_sound").play()

            document.getElementById("Meteoritolvl3").style.left = "-70%"
            document.getElementById("Meteoritolvl3").style.transition = "0s"
            setTimeout(Meteorito_Direccion4lvl3, 2000)

            document.getElementById("Meteorito2lvl3").style.left = "-70%"
            document.getElementById("Meteorito2lvl3").style.transition = "0s"
            setTimeout(Meteorito_Direccion4lvl3, 2000)

            document.getElementById("Meteorito3lvl3").style.left = "-70%"
            document.getElementById("Meteorito3lvl3").style.transition = "0s"
            setTimeout(Meteorito_Direccion3lvl3, 2600)
            
            document.getElementById("Meteorito4lvl3").style.left = "-70%"
            document.getElementById("Meteorito4lvl3").style.transition = "0s"
            setTimeout(Meteorito_Direccion4lvl3, 2900)

            Tiempolvl3 = 51
            Puntajelvl3 = 0
        }
        else {


            document.getElementById("Meteoritolvl3").style.transition = "1.9s"
            document.getElementById("Meteorito2lvl3").style.transition = "1.9s"
            document.getElementById("Meteorito3lvl3").style.transition = "1.9s"
            document.getElementById("Meteorito4lvl3").style.transition = "1.9s"
        }
    }

    setInterval(perdistelvl3, 40) //LE COLOCAMOS UNO PARA QUE SIEMPRE SE ESTE EJECUTANDO, DADO A 
    //QUE NO SABEMOS CUANDO EL METEORITO VA A SUPERAR EL LIMITE
}



//LE DECIMOS QUE AL PRESIONAR EL BOTON JUGAR EJECUTARA LA FUNCION PLAY     
document.getElementById("Playlvl3").addEventListener('click', PLAYlvl3)

//ESTE ES EL CONTEO DE LA CUENTA REGRESIVA QUE SE DA DESPUEZ DE PRESINAR JUGAR
Conteolvl3 = 4 

//ESTA FUNCION EJECUTA UN CONJUNTO DE ACCIONES AL PRESIONAR JUGAR
function PLAYlvl3() {
    document.getElementById("Fondo_Ciberpunk").play()
    //MUEVE EL TITULO FUERA DEL CONTENEDOR UNA VEZ DE CLICK A JUGAR
    document.getElementById("Textolvl3").style.left = "-900px"
    //MUEVE AL BOTON PLAY TRANS PRESIONAR PRESIONAR AL MISMO BOTON
    document.getElementById("Playlvl3").style.left = "-900px"
    //MUEVE LA DIFICULTAD AL PRESIONAR JUGAR
    document.getElementById("Dificultadlvl3").style.left = "-900px"
    function ARRACARlvl3(){    
        JUEGOlvl3()}
    //INVOCA AL JUEGO UNA VEZ PASEN 4 SEGUNDO - OSEA UNA VEZ TERMINE EL CONTADOR
    tiempo_de_arranquelvl3 =  setTimeout(ARRACARlvl3, 4100)
    //ESTA FUNCION EJECUTA LA CUENTA REGRESIVA Y RETIRA LA PANTALLA START 
    function ESPERARlvl3() {
        function Cuenta_rglvl3() {
            Conteolvl3--;
            document.getElementById("RGBlvl3").innerHTML = Conteolvl3
            if (Conteolvl3 == -1) {
                document.getElementById("Contenedor_contadorlvl3").style.display = "none"

                function Borrarlvl3() {
                    document.getElementById("Startlvl3").style.display = "none"

                    DETENER_JUEGOlvl3()
                } //HABILITA LA FUNCION DE PAUSE Y REANUDAR UNA VEZ CARGUE EL JUEGO
                setTimeout(Borrarlvl3, 500)
            }
        }
        setInterval(Cuenta_rglvl3, 1000)
    }

    setTimeout(ESPERARlvl3, 350)
} //SE EJECUTARA EN UN LAPSO DE 350, DESPUES DE PRESIONAR EL BOTON


//ESTA FUNCION CONTIENE EL REANUDE Y PAUSE DEL BOTON
function DETENER_JUEGOlvl3() {
    //INDICA QUE LA FUNCION DE PAUSE SE EJECUTARA UNA VEZ SE DE CLICK AL BOTON DE PAUSE        
    document.getElementById("Pauselvl3").addEventListener('click', PAUSElvl3)
    //ESTA VARIABLE INDICA SI SE EJECUTA O NO EL DESPAUSEO
    Activolvl3 = 1
    //HACE QUE EL JUEGO SE DETENGA
    function PAUSElvl3() {
        //SI LLEGA A UNA EJECUTA LA FUNCION PAUSE
        if (Activolvl3 == 1) {
            document.getElementById("Pausa_Pantallalvl3").style.display = "table"
            clearInterval(Restar_Tiempolvl3) //BORRAMOS LA FUNCION DE TIEMPO
            document.getElementById("Tiempolvl3").innerHTML = Tiempolvl3
            document.getElementById("Fondo_Ciberpunk").pause()
            function Meteorito_detenerlvl3() {
                clearInterval(Intervalo_Dirlvl3)
                clearInterval(Intervalo_Dir2lvl3)
                clearInterval(Intervalo_Dir3lvl3)
                clearInterval(Intervalo_Dir4lvl3)

                document.getElementById("Meteoritolvl3").style.left = document.getElementById("Meteoritolvl3").offsetLeft + "px"
                document.getElementById("Meteorito2lvl3").style.left = document.getElementById("Meteorito2lvl3").offsetLeft + "px"
                document.getElementById("Meteorito3lvl3").style.left = document.getElementById("Meteorito3lvl3").offsetLeft + "px"
                document.getElementById("Meteorito4lvl3").style.left = document.getElementById("Meteorito4lvl3").offsetLeft + "px"

                document.getElementById("Meteoritolvl3").style.top = document.getElementById("Meteoritolvl3").offsetTop + "px"
                document.getElementById("Meteorito2lvl3").style.top = document.getElementById("Meteorito2lvl3").offsetTop + "px"
                document.getElementById("Meteorito3lvl3").style.top = document.getElementById("Meteorito3lvl3").offsetTop + "px"
                document.getElementById("Meteorito4lvl3").style.top = document.getElementById("Meteorito4lvl3").offsetTop + "px"
            }

            Pause_offlvl3 = setInterval(Meteorito_detenerlvl3, 0.01) //LE ASEGNAMOS UNA ID, PARA BORRALO UNA VEZ SE DESPAUSEE
            Activolvl3 = 2
        }
        //CAMBIAMOS EL VALOR PARA QUE AL VOLVER A DARLE CLICK EJECUTE LA CONDICIONAL DE REANUDAR
        else { //LA FUNCION DE REANUDAR
            document.getElementById("Pausa_Pantallalvl3").style.display = "none"
            //BORRAMOS LA FUNCION, PARA QUE EL REANUDAR PUEDA EJECUTARSE DE NUEVO
            document.getElementById("Fondo_Ciberpunk").play()
            clearInterval(Pause_offlvl3)

            function Tiempo_Disminurlvl3() { //VOLVEMOS A CREAR LA FUNCION DE TIEMPO PARA QUE REANUDE EL CONTEO
                Tiempolvl3--;
                document.getElementById("Tiempolvl3").innerHTML = Tiempolvl3
                if (Tiempolvl3 == 0) {
                    Tiempolvl3 = 51
                    Puntajelvl3 = 0
                    alert("Lo lamento perdiste")
                }
            }

            Restar_Tiempolvl3 = setInterval(Tiempo_Disminurlvl3, 1000)

            document.getElementById("Meteoritolvl3").style.left = Distancia1lvl3 + "%"
            document.getElementById("Meteoritolvl3").style.top = Altura1lvl3 + "px"
            document.getElementById("Meteoritolvl3").style.transition = "2.7s"

            document.getElementById("Meteorito2lvl3").style.left = Distancia2lvl3 + "%"
            document.getElementById("Meteorito2lvl3").style.top = Altura2lvl3 + "px"
            document.getElementById("Meteorito2lvl3").style.transition = "2.7s"

            
            document.getElementById("Meteorito3lvl3").style.left = Distancia3lvl3 + "%"
            document.getElementById("Meteorito3lvl3").style.top = Altura3lvl3 + "px"
            document.getElementById("Meteorito3lvl3").style.transition = "2.7s"
            
            document.getElementById("Meteorito4lvl3").style.left = Distancia4lvl3 + "%"
            document.getElementById("Meteorito4lvl3").style.top = Altura4lvl3 + "px"
            document.getElementById("Meteorito4lvl3").style.transition = "2.7s"
            
            //ESTA FUNCION DIRIGE AL METEORITO 1 A LA TIERRA
            function Meteorito_Direccionlvl3() {
                Distancia1lvl3 = 80
                Altura1 = Math.round(Math.random() * 450)
        
                document.getElementById("Meteoritolvl3").style.left = Distancia1lvl3 + "%"
                document.getElementById("Meteoritolvl3").style.top = Altura1lvl3 + "px"
                document.getElementById("Meteoritolvl3").style.transition = "1.9s"
            }
        
            setTimeout(Meteorito_Direccionlvl3, 2000)
            Intervalo_Dirlvl3 = setInterval(Meteorito_Direccionlvl3, 2430)
        
            //ESTA FUNCION DIRIGE AL METEORITO 2 A LA TIERRA         
            function Meteorito_Direccion2lvl3() {
                Distancia2lvl3 = 80
                Altura2lvl3 = Math.round(Math.random() * 450)
        
                document.getElementById("Meteorito2lvl3").style.left = Distancia2lvl3 + "%"
                document.getElementById("Meteorito2lvl3").style.top = Altura2lvl3 + "px"
                document.getElementById("Meteoritolvl3").style.transition = "1.9s"
            }
        
            setTimeout(Meteorito_Direccion2lvl3, 2000)
            Intervalo_Dir2lvl3 = setInterval(Meteorito_Direccion2lvl3, 2350)
        
            //ESTA FUNCION DIRIGE AL METEORITO 3 A LA TIERRA
            function Meteorito_Direccion3lvl3() {
                Distancia3lvl3 = 80
                Altura3lvl3 = Math.round(Math.random() * 450)
        
                document.getElementById("Meteorito3lvl3").style.left = Distancia3lvl3 + "%"
                document.getElementById("Meteorito3lvl3").style.top = Altura3lvl3 + "px"
                document.getElementById("Meteoritolvl3").style.transition = "1.9s"
            }
        
            setTimeout(Meteorito_Direccion3lvl3, 2000)
            Intervalo_Dir3lvl3 = setInterval(Meteorito_Direccion3lvl3, 2250)
        
            //ESTA FUNCION DIRIGE AL METEORITO 4 A LA TIERRA
            function Meteorito_Direccion4lvl3() {
                Distancia4lvl3 = 80
                Altura4lvl3 = Math.round(Math.random() * 450)
        
                document.getElementById("Meteorito4lvl3").style.left = Distancia4lvl3 + "%"
                document.getElementById("Meteorito4lvl3").style.top = Altura4lvl3 + "px"
                document.getElementById("Meteoritolvl3").style.transition = "1.9s"
            }
        
            setTimeout(Meteorito_Direccion4lvl3, 2000)
            Intervalo_Dir4lvl3 = setInterval(Meteorito_Direccion4lvl3, 2150)
            
            //BORRAMOS LA FUNCION, PARA QUE EL REANUDAR PUEDA EJECUTARSE DE NUEVO

            Activolvl3 = 1
        }
    }
} //CAMBIAMOS EL VALOR DE NUEVO A 1 PARA QUE AL SIGUIENTE CLICK SE EJECUTE EL PAUSE  S