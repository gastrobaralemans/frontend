import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/auth/button";

const PostAdmin = () => {
    const [titulo, setTitulo] = useState("");
    const [imagen, setImagen] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [posts, setPosts] = useState([]);

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
            console.log("Respuesta completa posts:", response);
            const postsData = Array.isArray(response.data) ? response.data : [];
            setPosts(postsData);
        } catch (error) {
            console.error("Error al cargar los posts:", error);
            setPosts([]); 
        }
    };

    const crearPost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axios.post(
                "http://localhost:8080/api/posts",
                { titulo, imagen, descripcion },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTitulo("");
            setImagen("");
            setDescripcion("");
            obtenerPosts(); 
        } catch (error) {
            console.error("Error al crear post:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Publicaciones</h2>
            <form onSubmit={crearPost}>
                <div className="mb-4">
                    <label className="block font-semibold mb-1 text-[#740000]">Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-1 text-[#740000]">Insertar URL de imagen</label>
                    <input
                        type="text"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-1 text-[#740000]">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    ></textarea>
                </div>
                <Button type="submit">Crear post</Button>
            </form>

            <div>
                <h3 className="text-xl font-semibold my-5">Publicaciones creadas</h3>
                {Array.isArray(posts) && posts.length === 0 ? (
                    <p>No hay publicaciones aún.</p>
                ) : (
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="min-w-[250px] max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 hover:shadow-lg transition-shadow"
                            >
                                <h4 className="text-lg font-bold px-4 pt-4">{post.titulo}</h4>
                                {post.imagen && (
                                    <img
                                        src={post.imagen}
                                        alt={post.titulo}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="px-4 py-3">
                                    <p className="text-gray-700 text-sm">{post.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostAdmin;
