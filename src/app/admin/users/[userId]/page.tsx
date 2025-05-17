import { getUserById } from "@/app/actions/user.action";
import UserForm from "@/components/admin/users/UserForm";

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function BlogIdPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const userId = (await params).userId;

  const isNewUser = userId === "create-new";

  const user = isNewUser ? null : await getUserById(userId);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {isNewUser ? "Add New Blog" : `Edit Blog:`}
      </h1>

      <UserForm initialData={user} isEditing={!isNewUser} id={userId} />
    </div>
  );
}
