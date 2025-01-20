import {useNavigate} from "react-router-dom";
import DeleteModal from "./DeleteComponent";
import {useState} from "react";
import {deleteCategory} from "../api";

const CategoryRowComponent = ({index, category, count }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        setIsModalOpen(false);
        const result = await deleteCategory(category);
        window.dispatchEvent(new Event('invalidate-categories-cache'));
        navigate('/')
    };

    function updateCategory (categoryName)  {
        navigate(`/categories/${categoryName}/update`, { state: { category: categoryName } });
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{category}</td>
            <td>{count}</td>
            <td>
                <button
                    className="cat"
                    onClick={() => updateCategory(category)}>
                    Update
                </button>
            </td>
            <td>
                <button className="cat" onClick={() => setIsModalOpen(true)}>Delete</button>
                    <DeleteModal
                        show={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleDelete}/>
            </td>
        </tr>
    );
};

export default CategoryRowComponent;