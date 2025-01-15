function CategoriesList() {
    const categoryList = ["Contracts", "Torts", "Family Law", "Property Law", "Labour Law", "Consumer Protection", "Wills & Estates", "Personal Injury", "Dispute Resolution", "Civil Rights"]

    return (
        <aside className="bg-purple-500 text-white w-full">
            <ul className="space-y-4">
                {categoryList.map((category, index) => (
                    <li key={index} className="text-lg font-bold hover:underline p-3">
                    {category}
                </li>
                ))}
            </ul>
        </aside>
    )
}

export default CategoriesList;