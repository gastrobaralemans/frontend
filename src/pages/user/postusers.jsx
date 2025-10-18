import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/auth/button";
import Nav from "../../layouts/nav";
import Footer from "../../components/footer";
import { MessageCircle, Calendar, User } from "lucide-react";

const PostUser = () => {
  const [posts, setPosts] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [nuevoComentario, setNuevoComentario] = useState({});

  useEffect(() => {
    obtenerPosts();
  }, []);

  const obtenerPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const postsData = Array.isArray(response.data) ? response.data : [];
      setPosts(postsData);

      if (postsData.length > 0) {
        postsData.forEach((post) => {
          obtenerComentarios(post.id);
        });
      }
    } catch (error) {
      console.error("Error al cargar los posts:", error);
      setPosts([]);
    }
  };

  const obtenerComentarios = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(`http://localhost:8080/api/posts/${postId}/comentarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComentarios((prev) => ({
        ...prev,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error(`Error al cargar comentarios del post ${postId}:`, error);
    }
  };

  const enviarComentario = async (e, postId) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const contenido = nuevoComentario[postId];
    if (!contenido) return;

    try {
      await axios.post(
        `http://localhost:8080/api/posts/${postId}/comentarios`,
        { contenido },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNuevoComentario((prev) => ({
        ...prev,
        [postId]: "",
      }));
      obtenerComentarios(postId);
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#740000] mb-6 md:mb-8 text-center">
            Publicaciones
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg border border-gray-100"
                >
                  {post.imagen && (
                    <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                      <img
                        src={post.imagen}
                        alt={post.titulo}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-4 md:p-5 lg:p-6 flex-grow flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold text-[#740000] mb-3 line-clamp-2">
                      {post.titulo}
                    </h3>
                  
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(post.fecha || Date.now()).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="mb-4 flex-grow">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base line-clamp-4">
                        {post.descripcion}
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2 text-[#740000]" />
                          Comentarios ({comentarios[post.id]?.length || 0})
                        </h4>
                      </div>
                                            <div className="max-h-32 overflow-y-auto mb-4 space-y-3 pr-2">
                        {comentarios[post.id] && comentarios[post.id].length > 0 ? (
                          comentarios[post.id].map((comentario) => (
                            <div 
                              key={comentario.id} 
                              className="bg-gray-50 rounded-lg p-3 text-sm border border-gray-100"
                            >
                              <div className="flex items-start justify-between mb-1">
                                <div className="flex items-center">
                                  <User className="h-3 w-3 mr-1 text-gray-500" />
                                  <span className="font-medium text-gray-800 text-xs">
                                    {comentario.usuarioNombre}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(comentario.fecha).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mt-1">
                                {comentario.contenido}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-2">
                            Sin comentarios aún.
                          </p>
                        )}
                      </div>
                      <form onSubmit={(e) => enviarComentario(e, post.id)} className="mt-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Escribe un comentario..."
                            value={nuevoComentario[post.id] || ""}
                            onChange={(e) =>
                              setNuevoComentario((prev) => ({
                                ...prev,
                                [post.id]: e.target.value,
                              }))
                            }
                            className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#740000] focus:border-transparent"
                            required
                          />
                          <Button 
                            type="submit" 
                            className="px-4 py-2 text-sm whitespace-nowrap"
                          >
                            Comentar
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    No hay publicaciones
                  </h3>
                  <p className="text-gray-400">
                    Aún no se han publicado noticias o promociones.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostUser;