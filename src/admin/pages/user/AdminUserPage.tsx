import { Navigate, useNavigate, useParams } from "react-router";
import { useUser } from "@/admin/hooks/useUser";
import { UserForm } from "./ui/UserForm";
import { CustomLoading } from "@/components/custom/CustomLoading";
import { toast } from "sonner";
import type { UpdateUserPayload } from "@/admin/actions/updateUser.action";
import { getAuthErrorMessage } from "@/auth/helpers/auth-error";
import { useAuthStore } from "@/auth/store/auth.store";

export const AdminUserPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data: user, mutation } = useUser(id);

  const handleSubmitForm = async (payload: UpdateUserPayload) => {
    if (Object.keys(payload).length === 0) {
      toast.info("No hay cambios para guardar", {
        position: "top-right",
      });
      return;
    }

    await mutation.mutateAsync(
      { id, payload },
      {
        onSuccess: (data) => {
          const currentUser = useAuthStore.getState().user;
          if (currentUser?.id === data.id) {
            useAuthStore.setState({ user: { ...currentUser, ...data } });
          }

          toast.success("Usuario actualizado correctamente", {
            position: "top-right",
          });
          navigate(`/admin/user/${data.id}`);
        },
        onError: (error) => {
          toast.error(getAuthErrorMessage(error), {
            position: "top-right",
          });
        },
      },
    );
  };

  if (isError || !id) {
    return <Navigate to="/admin/users" />;
  }

  if (isLoading) {
    return <CustomLoading />;
  }

  if (!user) {
    return <Navigate to="/admin/users" />;
  }

  return (
    <UserForm
      key={user.id}
      user={user}
      onSubmit={handleSubmitForm}
      isPending={mutation.isPending}
    />
  );
};
