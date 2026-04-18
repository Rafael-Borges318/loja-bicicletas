

export const Loading = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      <span className="text-sm text-gray-500 font-medium">Carregando...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return <div className="py-8 w-full flex justify-center">{content}</div>;
};
