<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//require_once(APPPATH.'/libraries/REST_Controller.php');
//use Restserver\libraries\REST_Controller;

class Post extends CI_Controller {
    public function __construct(){
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding, application/json");
        header("Access-Control-Allow-Origin: *");
        parent::__construct();
        $this->load->database();
        $this->load->helper('url');
    }

    public function guardarPost($id_usuario, $titulo, $token, $likes, $coordenadas=""){
        $condiciones = array('id_usuario' => $id_usuario,
                            'token' => $token );
        $this->db->where($condiciones);
        $consulta = $this->db->get('Registro');
        $existe = $consulta->row();
        if(!$existe){
            $respuesta = array('error' => TRUE,
                                'mensaje' => 'Usuario y Token Incorrectos' );
            echo json_encode($respuesta);
            return;
        }
        //Guardar Img en carpeta de servidor local
        $config['upload_path'] = './upload/';
        $config['allowed_types'] = 'jpg|png|jpeg';
        $this->load->library('upload', $config);
        if (!$this->upload->do_upload('imagen')) {
            /*$datos = array('id_usuario' => $id_usuario,
                            'titulo' => $titulo,
                            'coordenadas' => $coordenadas,
                            'likes' => $likes,
                            'img' => "");
            $respuesta = array('error' => FALSE, 
            'id_usuario' => $id_usuario,
            'titulo' => $titulo,
            'coordenadas' => $coordenadas,
            'likes' => $likes,
            'img' => "");
            echo json_encode($respuesta);*/
        } 
        else {
            $data = array('img_info' => $this->upload->data());
            $datos = array('id_usuario' => $id_usuario,
                            'titulo' => $titulo,
                            'coordenadas' => $coordenadas,
                            'likes' => $likes,
                            'img' => $data['img_info']['file_name']);
            $respuesta = array('error' => FALSE, 
            'id_usuario' => $id_usuario,
            'titulo' => $titulo,
            'coordenadas' => $coordenadas,
            'likes' => $likes,
            'img' => $data);
            echo json_encode($respuesta);
            echo json_encode($data);
        }
    }

    public function saveNombreImg(){
        $data = $this->input->post();
        if(!isset($data['imagen'])){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'La informacion enviada no es valida' );
            echo json_encode($respuesta);
            return;
        }
        $img = array('img' => $data['img']);
        $this->db->insert('post_texto', $img);
    }


    public function savePost(){
        $data = $this->input->post();
        if(!isset($data['id_usuario']) OR !isset($data['titulo'])){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'La informacion enviada no es valida' );
            //$this->response($respuesta);
            echo json_encode($respuesta);
            return;
        }
        /*$condiciones = array('id_usuario' => $data['id_usuario'],
                            'token' => $data['token'] );
        $this->db->where($condiciones);
        $consulta = $this->db->get('Registro');
        //select * from Registro where id_usuario = '' and token = ''
        //$query = $this->db->query('select id_usuario, token from Registro where id_usuario = '.$data['id_usuario'].' and token = ' .$data['id_usuario'].' ');
        $existe = $consulta->row();
        if(!$existe){
            $respuesta = array('error' => TRUE,
                                'mensaje' => 'Usuario y Token Incorrectos');
            echo json_encode($respuesta);
            return;
        }*/
        /*$respuesta = array('error' => FALSE,
                            'id_usuario'=> $data['id_usuario'],
                            'token'=> $data['token'] );*/
        $dia = (int) date('d') - 1;
        $mes = date('m');
        $año = date('y');
        $fecha = $dia . '-' . $mes . '-' . $año;
        //Guardar Imagen en carpeta del servidor local
        //$config['upload_path'] = './upload/';
        //$config['allowed_types'] = 'jpg|png|jpeg';
        /*$config['max_size'] = 2000;
        $config['max_width'] = 1500;
        $config['max_height'] = 1500;*/

        //$this->load->library('upload', $config);

        /*if (!$this->upload->do_upload('profile_image')) {
            $error = array('error' => $this->upload->display_errors());
            echo json_encode($error);
        } 
        else {
            $data = array('image_metadata' => $this->upload->data());
            echo json_encode($data);
        }*/
        if($data['coordenadas'] == "" || $data['img'] == ""){
            $data['coordenadas'] = NULL;
            $data['img'] = NULL;
        }
        $datos = array('id_usuario' => $data['id_usuario'],
                            'titulo' => $data['titulo'],
                            'coordenadas' => $data['coordenadas'],
                            'likes' => $data['likes'],
                            'img' => $data['img']);
        $this->db->insert('post_texto', $datos);
        //$this->upload->do_upload('img');
        //$imagen = array('info_img' => $this->upload->data());
           // echo json_encode($imagen);
        $respuesta = array('error' => FALSE, 
        'id_usuario' => $data['id_usuario'],
        'titulo' => $data['titulo'],
        'coordenadas' => $data['coordenadas'],
        'likes' => $data['likes'],
        'img' => $data['img']);
        echo json_encode($respuesta);
    }
    public function agregarLike($id){
        $query = $this->db->query('select likes from post_texto where id_postexto = '.$id.'');
        $fila = $query->row();
        $like = $fila->likes;
        $like += 1;
        $this->db->set('likes', $like);
        $this->db->where('id_postexto', $id);
        $this->db->update('post_texto');
        //$addLike = array('likes' => $like );
        //$this->db->update('post_texto', $addLike);
        echo $like;
        //$query = $this->db->query('select likes from post_texto where id_postexto = '.$id.'');
        //$respuesta = array('error' => FALSE,
          //                  'likes'=> $query->result_array());
        //echo json_encode($respuesta);
        //echo json_encode($query->result_array());
    }
    public function agregarLikeComentario($id){
        $query = $this->db->query('select likes from comentarios where id_comentario = '.$id.'');
        $fila = $query->row();
        $like = $fila->likes;
        $like += 1;
        $this->db->set('likes', $like);
        $this->db->where('id_comentario', $id);
        //$addLike = array('likes' => $like );
        $this->db->update('comentarios');
        echo $like;
    }
    public function agregarDislikeComentario($id){
        $query = $this->db->query('select dislikes from comentarios where id_comentario = '.$id.'');
        $fila = $query->row();
        $dislike = $fila->dislikes;
        $dislike += 1;
        $this->db->set('dislikes', $dislike);
        $this->db->where('id_comentario', $id);
        //$addLike = array('dislikes' => $dislike );
        $this->db->update('comentarios');
        echo $dislike;
    }
    public function addComentario(){
        $data = $this->input->post();
        if(!isset($data['id_usuario']) OR !isset($data['comentario']) OR !isset($data['id_postexto'])
        OR !isset($data['likes']) OR !isset($data['dislikes'])){
            $respuesta = array('error' => TRUE,
                                'mensaje'=> 'La informacion enviada no es valida' );
            echo json_encode($respuesta);
            return;
        }
        $comentario = array('id_usuario' => $data['id_usuario'],
                            'comentario' => $data['comentario'],
                            'id_postexto' => $data['id_postexto'],
                            'likes' => $data['likes'], 
                            'dislikes' => $data['dislikes']);
        $this->db->insert('comentarios', $comentario);

        //Guardar Comentario en Post por medio de ID
        //$ultimoID_Comentario = $this->db->insert_id();
        //$this->db->set('id_comentario', $ultimoID_Comentario);
        //$this->db->where('id_postexto', $data['id_postexto']);
        //$this->db->update('post_texto');
        //update post_texto set id_comentario = 1 where id_postexto = 3
        
        $respuesta = array('error' => FALSE,
                            'id_usuario' => $data['id_usuario'],
                            'comentario' => $data['comentario'],
                            'likes' => $data['likes'], 
                            'dislikes' => $data['dislikes'],
                            'insertando_en_id_post' => $data['id_postexto']);
        echo json_encode($respuesta);
    }

    public function getComentarios($id_postexto){
        //select comentario from comentarios inner join post_texto on comentarios.id_postexto = post_texto.id_postexto where comentarios.id_postexto = 1
        /*select comentarios.comentario, comentarios.creado_en, comentarios.likes, comentarios.dislikes from comentarios inner join post_texto 
        on comentarios.id_postexto = post_texto.id_postexto where comentarios.id_postexto = 1 */
        /*select Registro.nombre, Registro.avatar, comentarios.comentario, comentarios.creado_en, 
        comentarios.likes, comentarios.dislikes from comentarios inner join post_texto on
        comentarios.id_postexto = post_texto.id_postexto inner join Registro on comentarios.id_usuario = Registro.id_usuario 
        where comentarios.id_postexto = 1 */
        $query = $this->db->query('select Registro.id_usuario, Registro.nombre, Registro.avatar, comentarios.comentario, comentarios.id_comentario, comentarios.creado_en, 
        comentarios.likes, comentarios.dislikes from comentarios inner join post_texto on
        comentarios.id_postexto = post_texto.id_postexto inner join Registro on comentarios.id_usuario = Registro.id_usuario 
        where comentarios.id_postexto = '.$id_postexto.'');
        $respuesta = array('error' => FALSE,
                            'comentarios'=> $query->result_array());
        echo  json_encode($respuesta);
    }

    public function getTodos($pagina=0){
        $pagina*=10;
        /*select post_texto.id_postexto, Registro.nombre, Registro.avatar, 
        post_texto.id_usuario, post_texto.creado_en, post_texto.titulo, 
        post_texto.likes, post_texto.coordenadas from post_texto inner join 
        Registro on post_texto.id_usuario = Registro.id_usuario limit 0,10 */
        //$query = $this->db->query('SELECT * FROM `post_texto` limit '.$pagina.',10');
        $query = $this->db->query('select post_texto.id_postexto, Registro.nombre, Registro.avatar, 
        post_texto.id_usuario, post_texto.creado_en, post_texto.titulo, post_texto.img,
        post_texto.likes, post_texto.coordenadas from post_texto inner join 
        Registro on post_texto.id_usuario = Registro.id_usuario order by post_texto.id_postexto desc limit '.$pagina.',10');
        $respuesta = array('error' => FALSE,
                            'post'=> $query->result_array());
        echo json_encode($respuesta);
    }
    public function getNumeroComentarios($id_postexto){
        $query = $this->db->query('select count(comentario) as n_comentarios from comentarios where id_postexto = '.$id_postexto.'');
        $fila = $query->row();
        $numero = $fila->n_comentarios;
        //$query = $this->db->query('select count(comentario) as n_comentarios from comentarios where id_postexto = '.$id_postexto.'');
        //$respuesta = array('error' => FALSE,
        //                    'numero_comentarios'=> $numero);
        echo $numero;
    }
    public function getMyPost($pagina=0, $id_usuario){
        $pagina*=10;
        $consulta = $this->db->query('select post_texto.id_postexto, Registro.nombre, Registro.avatar, 
        post_texto.id_usuario, post_texto.creado_en, post_texto.titulo, post_texto.img, 
        post_texto.likes, post_texto.coordenadas from post_texto 
        inner join Registro on Registro.id_usuario = post_texto.id_usuario where 
        Registro.id_usuario = '.$id_usuario.' order by post_texto.id_postexto desc limit '.$pagina.',10');
        $respuesta = array('error' => FALSE,
                            'mis_post' => $consulta->result_array());
        echo json_encode($respuesta);
    }
    public function saveImg($id_usuario, $titulo, $token, $likes, $coordenadas=""){
        /*//Ruta donde se guardan los ficheros
        $config['upload_path'] = './subidas/';
        
       //Tipos de ficheros permitidos
        $config['allowed_types'] = 'jpg|png';
        $config['file_name'] = $img;
         
       //Cargamos la librería de subida y le pasamos la configuración
        $this->load->library('upload', $config);
 
        if(!$this->upload->do_upload()){
            //Si al subirse hay algún error lo meto en un array para pasárselo a la vista
                $error=array('error' => $this->upload->display_errors());
                //$this->load->view('subir_view', $error);
                echo json_encode($error);
                $data['uploadError'] = $this->upload->display_errors();
                echo $this->upload->display_errors();
                return;
        }else{
            //Datos del fichero subido
            $datos["img"]=$this->upload->data();
            // Podemos acceder a todas las propiedades del fichero subido
            // $datos["img"]["file_name"]);
 
            //Cargamos la vista y le pasamos los datos
            json_encode($datos);
        }*/

        /*$mi_archivo = 'mi_archivo';
        $config['upload_path'] = "./upload/";
        $config['file_name'] = "nombre_archivo";
        $config['allowed_types'] = "jpg|jpeg|png";

        $this->load->library('upload', $config);
        
        if (!$this->upload->do_upload('image_file')) {
            //*** ocurrio un error
            $data['uploadError'] = $this->upload->display_errors();
            echo $this->upload->display_errors();
            return;
        }

        $data['uploadSuccess'] = $this->upload->data();*/

        /*if(!isset($_FILES["image_file"]["name"])){
            $config['upload_path'] = "./upload/";
            $config['allowed_types'] = "jpg|jpeg|png";
            $this->load->library('upload', $config);
            if (!$this->upload->do_upload('image_file')) {
                //$data['uploadError'] = $this->upload->display_errors();
                echo $this->upload->display_errors();
            }
            else{
                $data = $this->upload->data();
            }
        }*/
        $condiciones = array('id_usuario' => $id_usuario,
                            'token' => $token );
        $this->db->where($condiciones);
        $consulta = $this->db->get('Registro');
        $existe = $consulta->row();
        if(!$existe){
            $respuesta = array('error' => TRUE,
                                'mensaje' => 'Usuario y Token Incorrectos' );
            echo json_encode($respuesta);
            return;
        }
        $config['upload_path'] = './upload/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = 2000;
        $config['max_width'] = 1500;
        $config['max_height'] = 1500;

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('profile_image')) {
            $error = array('error' => $this->upload->display_errors());
            echo json_encode($error);
        } else {
            $data = array('img_info' => $this->upload->data(),
                            'nombre' => $titulo);
            echo json_encode($data);
        }
    }

    public function guardarImagen(){
        $config['upload_path'] = './upload/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = 2000;
        $config['max_width'] = 1500;
        $config['max_height'] = 1500;

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('imagen')) {
            $error = array('error' => $this->upload->display_errors());
            echo json_encode($error);
        } else {
            $data = array('img_info' => $this->upload->data());
            echo json_encode($data);
        }
    }
    public function subirImagen(){
        header('Access-Control-Allow-Origin: *');
        //$target_path = "../../upload";
        $target_path = "./upload/";

        $target_path = $target_path . basename( $_FILES['file']['name']);

        if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
        echo "Upload and move success";
        } else{
        echo $target_path;
        echo "There was an error uploading the file, please try again!";
        }
    }
}