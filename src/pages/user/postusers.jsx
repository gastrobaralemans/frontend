import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/auth/button";
import Nav from "../../layouts/nav";
import Footer from "../../components/footer";

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

    <main className="flex-grow p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border overflow-hidden flex flex-col w-full max-w-[300px]"
            >
              <h4 className="text-lg text-[#740000] font-bold px-4 pt-4">{post.titulo}</h4>
              {post.imagen && (
                <img
                  src={post.imagen}
                  alt={post.titulo}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="px-4 py-3">
                <p className="text-gray-700 text-sm mb-4">{post.descripcion}</p>

                <form onSubmit={(e) => enviarComentario(e, post.id)} className="mb-3">
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
                    className="w-full border px-3 py-2 mb-2 text-sm"
                    required
                  />
                  <Button type="submit">Comentar</Button>
                </form>

                <div>
                  <h5 className="font-semibold text-sm mb-2">Comentarios:</h5>
                  {comentarios[post.id] && comentarios[post.id].length > 0 ? (
                    comentarios[post.id].map((comentario) => (
                      <div key={comentario.id} className="border-b py-1 text-sm">
                        <strong>{comentario.usuarioNombre}:</strong> {comentario.contenido}
                        <div className="text-xs text-gray-500">
                          {new Date(comentario.fecha).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Sin comentarios aún.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No hay publicaciones.</p>
        )}
      </div>
    </main>

    <Footer />
  </div>
);


    
    
};

export default PostUser;
