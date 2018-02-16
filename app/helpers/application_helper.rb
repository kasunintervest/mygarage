module ApplicationHelper
  def current_class?(test_path)
    return 'active' if request.path == test_path
    ''
  end

  def is_page?(path)
    if request.path == path
      true
    else
      false
    end
  end
end
