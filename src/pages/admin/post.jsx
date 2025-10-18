import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/auth/button";
import useImageUpload from "../../hooks/useImageUpload";
import { toast } from 'sonner';

const PostAdmin = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [posts, setPosts] = useState([]);
    const [imagen, setImagen]=useState("");
    const [preview, setPreview] = useState("");
    const { subir, loading } = useImageUpload();

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

    const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    subir(file)
      .then((urlRemota) => {
        setImagen(urlRemota);
        URL.revokeObjectURL(localUrl);
      })
      .catch(() => toast.error("Error al subir imagen"));
  };


    const crearPost = async (e) => {
        e.preventDefault();
        if (!imagen) return toast.error("Espera a que la imagen termine de subir");
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
            setPreview("");
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
                    <input
                        type="text"
                        value={titulo}
                        placeholder="Titulo del post"
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Imagen</label>
                        <input type="file" accept="image/*" onChange={handleFile} />
                            {loading && <p className="text-sm text-gray-500">Subiendo...</p>}
                        {preview && (
                            <img src={preview} alt="preview" className="mt-2 h-32 object-cover rounded" />
                        )}
                </div>
                <div className="mb-4">
                    <textarea
                        value={descripcion}
                        placeholder="Descripción"
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full border px-3 py-2"
                        required
                    ></textarea>
                </div>
                <Button type="submit">Crear publicación</Button>
            </form>

            <div>
                <h3 className="text-xl font-semibold my-5">Publicaciones creadas</h3>
                {Array.isArray(posts) && posts.length === 0 ? (
                    <p>No hay publicaciones aún.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white border shadow-md overflow-hidden max-w-xs w-full"
                            >
                                <h4 className="text-lg font-bold px-4 pt-4">{post.titulo}</h4>
                                {post.imagen && (
                                    <img
                                        src={post.imagen}
                                        alt={post.titulo}
                                        className="w-full h-48 object-fit"
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
