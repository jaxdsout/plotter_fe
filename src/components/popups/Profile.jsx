import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormField, Button, Icon, Loader, Divider } from 'semantic-ui-react';
import { update_profile, update_avatar } from '../../store/actions/agent';
import { load_user } from '../../store/actions/auth';
import "./popups.css";

function Profile({ user, update_profile, update_avatar, load_user }) {
    const [formData, setFormData] = useState({
        trec: '',
        website: '',
        phone_number: '',
    });
    const { trec, website, phone_number } = formData;
    const [avatar, setAvatar] = useState(null);
    const [profileEdit, setProfileEdit] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const toggleEditProfile = () => {
        if (profileEdit) {
            setProfileEdit(false);
        } else {
            setProfileEdit(true);
        }
    };

    const handleProfileChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await update_profile(user, trec, website, phone_number);
            setProfileEdit(false);
            setLoading(false);
            await load_user();
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    const handleAvatarChange = e => setAvatar(e.target.files[0]);

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (avatar) {
            try {
                setLoading(true);
                await update_avatar(user, avatar);
                setProfileEdit(false);
                setLoading(false);
                await load_user();
            } catch (err) {
                console.error('Error updating avatar:', err);
            }
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                trec: user.profile.trec || '',
                website: user.profile.website || '',
                phone_number: user.profile.phone_number || '',
            });
        }
    }, [user]);

    return (
        <div className='profileWrapper'>
            <div className='profileSettingBtn'>
                <Link onClick={toggleEditProfile}>
                    <Icon name='setting' size='large' />
                </Link>
            </div>

            <div className='profileAvatarArea'>
                {user.profile.avatar === null ? (
                    <i className="user circle icon" style={{ fontSize: '40px', marginTop: '0.5rem', marginBottom: '-0.5rem' }}></i>
                ) : (
                    <img src={user.profile.avatar} className="profileAvatar" alt="avatar" />
                )}
            </div>
            <div className='profileName'>
                {profileEdit ? (
                    <span>Edit Profile</span>
                ) : (
                    <span>{user.profile.full_name}</span>
                )}
            </div>

            {profileEdit ? (
                <div className='profileEditCard'>
                    <div>
                        <Form onSubmit={handleProfileSubmit}>
                            <FormField>
                                <label htmlFor="phone_number">Phone:</label>
                                <input
                                    className="profileInput"
                                    type="text"
                                    name="phone_number"
                                    value={phone_number}
                                    onChange={handleProfileChange}
                                />
                            </FormField>
                            <FormField className='profileFieldSpacing'>
                                <label htmlFor="website">Website:</label>
                                <input
                                    className="profileInput"
                                    type="text"
                                    name="website"
                                    value={website}
                                    onChange={handleProfileChange}
                                />
                            </FormField>
                            <FormField className='profileFieldSpacing'>
                                <label htmlFor="trec">TREC ID:</label>
                                <input
                                    className="profileInput"
                                    type="text"
                                    name="trec"
                                    value={trec}
                                    onChange={handleProfileChange}
                                />
                            </FormField>
                            <div className='profileSubmitRow'>
                                <Button color="green" type="submit" size='tiny'>
                                    {isLoading ? (
                                        <Loader active inline inverted size='mini' />
                                    ) : (
                                        <span>SAVE PROFILE UPDATES</span>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <Divider />
                    <div>
                        <Form onSubmit={handleAvatarSubmit} className='profileAvatarForm'>
                            <FormField>
                                <label className="label" htmlFor="avatar">Profile Picture:</label>
                                <input
                                    style={{ borderRadius: '0.5rem' }}
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </FormField>
                            <div className='profileSubmitRow'>
                                <Button color="green" type="submit" size='tiny'>
                                    {isLoading ? (
                                        <Loader active inline inverted size='mini' />
                                    ) : (
                                        <span>UPLOAD</span>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            ) : (
                <div>
                    <p><b>Phone:</b> {user.profile.phone_number}</p>
                    <p><b>Email:</b> {user.profile.email}</p>
                    <p><b>Website:</b> {user.profile.website}</p>
                    <p><b>TREC ID:</b> {user.profile.trec}</p>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    user: state.auth.user,
});

export default connect(mapStateToProps, { update_profile, update_avatar, load_user })(Profile);
