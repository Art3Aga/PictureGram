<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//require_once(APPPATH.'/libraries/REST_Controller.php');
//use Restserver\libraries\REST_Controller;

class Login extends CI_Controller {
    public function __construct(){
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
        header("Access-Control-Allow-Origin: *");
        parent::__construct();
        $this->load->database();
    }

    public function logearse(){
        $data = $this->input->post();
        if(!isset($data['email']) OR !isset($data['clave'])){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'La informacion enviada no es valida' );
            //$this->response($respuesta);
            echo json_encode($respuesta);
            return;
        }
        //Se envia el correo y Contraseña en el post
        $datos = array('email' => $data['email'], 'clave' => $data['clave']);
        $query = $this->db->get_where('Registro', $datos); //es lo mismo que select * from Registro where email = '' clave = ''
        $usuario = $query->row(); // viene la data
        //comprobar si existe el correo y la clave en la BD
        if(!isset($usuario)){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'Email y/o Clave Incorrectas' );
            echo json_encode($respuesta);                          
            return;
        }
        $respuesta = array('ok' => TRUE,
                        'id_usuario' => $usuario->id_usuario,
                        'nombre' => $usuario->nombre,
                        'email' => $usuario->email,
                        'clave' => $usuario->clave,
                        'avatar' => $usuario->avatar,
                        'token' => $usuario->token );
        echo json_encode($respuesta);
    }

    public function logearse2($email, $clave){
        //$data = $this->input->post();
        /*if(!isset($data['email']) OR !isset($data['clave'])){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'La informacion enviada no es valida' );
            //$this->response($respuesta);
            echo json_encode($respuesta);
            return;
        }*/
        //Se envia el correo y Contraseña en el post
        $datos = array('email' => $email, 'clave' => $clave);
        $query = $this->db->get_where('Registro', $datos); //es lo mismo que select * from Registro where email = '' clave = ''
        $usuario = $query->row(); // viene la data
        //comprobar si existe el correo y la clave en la BD
        if(!isset($usuario)){
            $respuesta = array('ok' => FALSE,
                                'mensaje'=> 'Email y/o Clave Incorrectas' );
            echo json_encode($respuesta);                          
            return;
        }
        $respuesta = array('ok' => TRUE,
                        'id_usuario' => $usuario->id_usuario,
                        'nombre' => $usuario->nombre,
                        'email' => $usuario->email,
                        'clave' => $usuario->clave,
                        'avatar' => $usuario->avatar,
                        'token' => $usuario->token );
        echo json_encode($respuesta);
    }

    public function registro(){
        $data = $this->input->post();
        if(!isset($data['email']) OR !isset($data['clave']) OR !isset($data['nombre']) OR !isset($data['avatar'])){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'La informacion enviada no es valida' );
            //$this->response($respuesta);
            echo json_encode($respuesta);
            return;
        }
        $token = bin2hex( openssl_random_pseudo_bytes(20));  //genera un nº hexa aleato de 20 caract
        $token = hash('ripemd160', $data['email']); //hash para que el token siempre sea el mismo
        //Se envia el correo y Contraseña en el post
        $datos = array('Email' => $data['email'], 'Clave' => $data['clave'],
                            'Avatar' => $data['avatar'], 'Nombre' => $data['nombre'], 
                            'token' => $token);
        //GUARDAR en BD Token
        $this->db->reset_query(); // limpiar querys para volver a empezar
        $this->db->insert('Registro',$datos);

        $respuesta = array('error' => FALSE, 
        'token'=> $token,
        'nombre'=> $data['nombre'],
        'email'=> $data['email'],
        'clave'=> $data['clave'],
        'avatar'=> $data['avatar']);
        echo json_encode($respuesta);
    }

    public function registro2($nombre, $email, $clave, $avatar){
        $token = bin2hex( openssl_random_pseudo_bytes(20));  //genera un nº hexa aleato de 20 caract
        $token = hash('ripemd160', $email); //hash para que el token siempre sea el mismo
        //Se envia el correo y Contraseña en el post
        $datos = array('Email' => $email, 'Clave' => $clave,
                            'Avatar' => $avatar, 'Nombre' => urldecode($nombre), 
                            'token' => $token);
        //GUARDAR en BD Token
        $this->db->reset_query(); // limpiar querys para volver a empezar
        $this->db->insert('Registro',$datos);
        $respuesta = array('error' => FALSE, 
        'token'=> $token,
        'nombre'=> urldecode($nombre),
        'email'=> $email,
        'clave'=> $clave,
        'avatar'=> $avatar);
        echo json_encode($respuesta);
    }

    public function updateUsuario(){
        $data = $this->input->post();
        if(!isset($data['email']) OR !isset($data['clave'])){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'La informacion enviada no es valida' );
            //$this->response($respuesta);
            echo json_encode($respuesta);
            return;
        }
        //Se envia el correo y Contraseña en el post
        $condiciones = array('Email' => $data['email'], 'Clave' => $data['clave']);
        //actualizar datos de usuario
        $userNuevo = array('email' => $data['email'],
                        'clave' => $data['clave'],
                        'Avatar' => $data['avatar']);
        $this->db->where('id_usuario', '1');
        $this->db->update('login', $userNuevo);
        $respuesta = array('error' => FALSE, 
        'email'=> $data['email'],
        'clave'=> $data['clave'],
        'Avatar' => $data['avatar']);
        echo json_encode($respuesta);
    }
}
